export const showResponseError = async (dispatch, error, store) => {
  console.log('ERR', dispatch, error, store)
  dispatch({ error });

  setTimeout(() => dispatch(resetError), 4000);
}

export const resetError = async (dispatch) => {
  dispatch({ error: null });
}
