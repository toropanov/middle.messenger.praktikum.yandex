import UserAPI from '../api/user';
import Store from '../core/Store';

const storeInstance = new Store();

export const searchUsersByLogin = async (dispatch, query, store) => {
  const { response, status } = await UserAPI.searchByLogin({ login: query });

  if (status === 200) {
    const { activeChain } = storeInstance.getState();

    dispatch({
      activeChain: {
        ...activeChain,
        participantSuggestions: JSON.parse(response)
      }
    })
  }
}
