import ChatAPI from '../api/chat';
import ResourcesAPI from '../api/resources';
import Store from '../core/Store';
import { ChatCreateRequestData, IDispatch } from '../types';

const storeInstance = new Store();

export const getChains = async (dispatch: IDispatch) => {
  const { response } = await ChatAPI.getChains();
  
  dispatch({
    chains: JSON.parse(response),
  })
}

export const createChat = async (dispatch: IDispatch, data: ChatCreateRequestData) => {
  await ChatAPI.create(data);
  
  dispatch(getChains);
}

export const selectChain = async (dispatch: IDispatch, id: number) => {
  const { chains } = storeInstance.getState();

  if (chains) {
    const info = chains.filter(chain => id === chain.id)[0];
    dispatch({ activeChain: null });
    dispatch({
      activeChain: {
        id,
        info
      }
    });
  
    // dispatch(subscribeChatSession, id);
    dispatch(getParticipants, id);
  }
}

export const subscribeChatSession = async(dispatch: IDispatch, chatID: number) => {
  const { response } = await ChatAPI.getChatToken(chatID);
  const { token } = JSON.parse(response);
  const { user, activeChain } = storeInstance.getState();
  
  if (!user) return;

  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatID}/${token}`);

  socket.addEventListener('connection', () => {
    socket.addEventListener('error', () => console.error);

    socket.addEventListener('message', event => {
      const { activeChain } = storeInstance.getState();
      const existingMessages = activeChain?.messages || [];
      const parsedMessages = JSON.parse(event.data);
      const messages = Array.isArray(parsedMessages) ? parsedMessages : [parsedMessages];
  
      dispatch({
        activeChain: {
          ...activeChain,
          messages: [
            ...existingMessages,
            ...messages
          ]
        }
      })
    });
  });

  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  });
  
  socket.addEventListener('close', event => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
  
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  dispatch({
    ...activeChain,
    ...{ activeChain: { socket } }
  });
}

export const sendMessage = async (_dispatch: IDispatch, content: string) => {
  const { activeChain } = storeInstance.getState();

  if (activeChain && activeChain.socket) {
    activeChain.socket.send(JSON.stringify({
      content,
      type: 'message',
    }));
  }
}

export const sendAttachment = async (_dispatch: IDispatch, attachment: File) => {
  const { activeChain } = storeInstance.getState();

  const data = new FormData();
  data.append('resource', attachment);

  const { response } = await ResourcesAPI.upload(data);
  const { id } = JSON.parse(response);

  if (activeChain && activeChain.socket) {
    activeChain.socket.send(JSON.stringify({
      content: String(id),
      type: 'file',
    }));
  }
}

export const getParticipants = async(dispatch: IDispatch, chatID: number) => {
  const { activeChain } = storeInstance.getState();
  const { response } = await ChatAPI.getParticipants(chatID);
  
  dispatch({ activeChain: {
    ...activeChain,
    participants: JSON.parse(response)
  } });
}

export const addParticipants =  async(dispatch: IDispatch, id: number) => {
  const { activeChain } = storeInstance.getState();

  if (activeChain) {
    const chatId = activeChain.id as number;

    await ChatAPI.addParticipants({
      'users[0]': id,
      chatId
    });

    dispatch(getParticipants, chatId);
  }
}

export const deleteParticipants =  async(dispatch: IDispatch, id: number) => {
  const { activeChain } = storeInstance.getState();

  if (activeChain) {
    const chatId = activeChain.id as number;

    await ChatAPI.deleteParticipants({
      'users[0]': id,
      chatId
    });
  
    dispatch(getParticipants, chatId);
  }
}
