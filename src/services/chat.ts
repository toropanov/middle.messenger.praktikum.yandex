import ChatAPI from '../api/chat';

export const getChains = async (dispatch, data, store) => {
  const { response } = await ChatAPI.getChains();
  
  dispatch({
    chains: JSON.parse(response),
  })
}

export const selectChain = async (dispatch, id, store) => {
  dispatch({ activeChain: { id } });
  dispatch(getParticipants, id);

  dispatch(subscribeChatSession, id);
}

export const subscribeChatSession = async(dispatch, chatID, store) => {
  const { response } = await ChatAPI.getChatToken(chatID);
  const { token } = JSON.parse(response);
  const { user, activeChain } = store;
  
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatID}/${token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
  
    // socket.send(JSON.stringify({
    //   content: 'Моё первое сообщение миру!',
    //   type: 'message',
    // }));

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
    console.log('Receive message', event.data, activeChain);
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

export const getParticipants = async(dispatch, data, store) => {
  const { activeChain } = store;
  const { response } = await ChatAPI.getParticipants(data);
  dispatch({ activeChain: {
    ...activeChain,
    particpants: JSON.parse(response)
  } });
  console.log(response, JSON.parse(response), { activeChain: {
    ...activeChain,
    particpants: JSON.parse(response)
  } })
}
