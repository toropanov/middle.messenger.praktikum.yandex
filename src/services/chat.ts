import ChatAPI from '../api/chat';
import Router from '../core/Router';

export const getChains = async (dispatch, data, store) => {
  const { response } = await ChatAPI.getChains();
  
  dispatch({
    chains: JSON.parse(response),
    activeChainID: 3
  })
}

export const sendMessage = async (dispatch, data) => {
  await ChatAPI.sendMessage(data);
}
