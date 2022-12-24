import ChatAPI from '../api/chat';
import Router from '../core/Router';

export const getChains = async (dispatch, data, store) => {
  const { response } = await ChatAPI.getChains();
  
  dispatch({
    chains: JSON.parse(response),
    activeChainID: 3
  })
}

export const subscribeChatSession = async(dispatch, chatID, store) => {
  const { response } = await ChatAPI.getChatToken(chatID);
  const { token } = JSON.parse(response);
  const { user, activeChain } = store; 
  
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatID}/${token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
  
    socket.send(JSON.stringify({
      content: 'Моё первое сообщение миру!',
      type: 'message',
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
    console.log('Получены данные', event.data);
    dispatch({
      activeChain: {
        ...activeChain,
        messages: JSON.parse(event.data)
      }
    })
  });
  
  socket.addEventListener('error', event => {
    console.log('Ошибка', event.message);
  }); 
}

export const sendMessage = async (dispatch, data) => {
  await ChatAPI.sendMessage(data);
}
