import ChatAPI from '../api/chat';
import Router from '../core/Router';

export const getChains = async (dispatch, data, store) => {
  const response = await ChatAPI.getChains();
  
  dispatch({
    chains: response,
  })
}
