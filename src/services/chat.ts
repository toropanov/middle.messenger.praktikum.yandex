import ChatAPI from '../api/chat';
import Store from '../core/Store';

const storeInstance = new Store();

export const getChains = async (dispatch, data, store) => {
  const { response } = await ChatAPI.getChains();
  
  dispatch({
    chains: JSON.parse(response),
  })
}

export const createChat = async (dispatch, data, store) => {
  await ChatAPI.create(data);
  
  dispatch(getChains);
}

export const selectChain = async (dispatch, id, store) => {
  dispatch({ activeChain: null });
  dispatch({ activeChain: { id } });

  dispatch(subscribeChatSession, id);
  dispatch(getParticipants, id);
}

export const subscribeChatSession = async(dispatch, chatID) => {
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

export const sendMessage = async (dispatch, content, store) => {
  const { activeChain } = store;

  activeChain!.socket.send(JSON.stringify({
    content,
    type: 'message',
  }));
}

export const getParticipants = async(dispatch, data, store) => {
  const { activeChain } = store;
  const { response } = await ChatAPI.getParticipants(data);
  
  dispatch({ activeChain: {
    ...activeChain,
    particpants: JSON.parse(response)
  } });
}
