import UserAPI from '../api/user';
import Store from '../core/Store';

import { IDispatch } from '../types';

const storeInstance = new Store();

export const searchUsersByLogin = async (dispatch: IDispatch, query: string) => {
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
