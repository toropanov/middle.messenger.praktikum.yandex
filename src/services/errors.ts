import { IDispatch} from '../types';
export const showResponseError = async (dispatch: IDispatch, error: string) => {
  dispatch({ error });

  setTimeout(() => dispatch(resetError), 4000);
}

export const resetError = async (dispatch: IDispatch) => {
  dispatch({ error: null });
}
