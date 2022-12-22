import ChatAPI from '../api/chat';
import Router from '../core/Router';

export const getChains = async (dispatch, data, store) => {
  const { response } = await ChatAPI.getChains();

  console.log({ response })
  console.log({ dispatch, data, store})
  
  dispatch({
    chains: JSON.parse(response),
  })
}

export const sendMessage = async (dispatch, data) => {
  await ChatAPI.sendMessage(data);
}
