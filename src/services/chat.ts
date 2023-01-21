import ChatAPI from '../api/chat';
import ResourcesAPI from '../api/resources';
import Store from '../core/Store';
import { IDispatch } from '../types';

const storeInstance = new Store();

export const getChains = async (dispatch: IDispatch, data) => {
  const { response } = await ChatAPI.getChains();
  
  dispatch({
    chains: JSON.parse(response),
  })
}

export const createChat = async (dispatch: IDispatch, data) => {
  await ChatAPI.create(data);
  
  dispatch(getChains);
}

export const selectChain = async (dispatch: IDispatch, id: number) => {
  const { chains } = storeInstance.getState();
  const info = chains!.filter(chain => id === chain.id)![0];
  dispatch({ activeChain: null });
  dispatch({
    activeChain: {
      id,
      info
    }
  });

  dispatch(subscribeChatSession, id);
  dispatch(getParticipants, id);
}

export const subscribeChatSession = async(dispatch: IDispatch, chatID: number) => {
  const { response } = await ChatAPI.getChatToken(chatID);
  const { token } = JSON.parse(response);
  const { user, activeChain } = storeInstance.getState();
  
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatID}/${token}`);

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
  
  socket.addEventListener('error', event => {
    console.log('Ошибка', event.message);
  });
  
  dispatch({
    ...activeChain,
    ...{ activeChain: { socket } }
  });
}

export const sendMessage = async (dispatch: IDispatch, content, store) => {
  const { activeChain } = store;

  activeChain!.socket.send(JSON.stringify({
    content,
    type: 'message',
  }));
}

export const sendAttachment = async (dispatch: IDispatch, attachment) => {
  const { activeChain } = storeInstance.getState();

  const data = new FormData();
  data.append('resource', attachment);

  const { response } = await ResourcesAPI.upload(data);
  const { id } = JSON.parse(response);

  activeChain!.socket.send(JSON.stringify({
    content: String(id),
    type: 'file',
  }));
}

export const getParticipants = async(dispatch: IDispatch, data, store) => {
  const { activeChain } = storeInstance.getState();
  const { response } = await ChatAPI.getParticipants(data);
  
  dispatch({ activeChain: {
    ...activeChain,
    participants: JSON.parse(response)
  } });
}

export const addParticipants =  async(dispatch: IDispatch, id, store) => {
  const { activeChain } = storeInstance.getState();
  await ChatAPI.addParticipants({
    'users[0]': id,
    chatId: activeChain?.id
  });

  dispatch(getParticipants, activeChain?.id);
}

export const deleteParticipants =  async(dispatch: IDispatch, id, store) => {
  const { activeChain } = storeInstance.getState();
  await ChatAPI.deleteParticipants({
    'users[0]': id,
    chatId: activeChain?.id
  });

  dispatch(getParticipants, activeChain?.id);
}
