import AuthAPI from "../api/auth";

export const initApp = async (dispatch, state, action) => {
  console.log({ dispatch, state, action })
  const response = AuthAPI.getUser();

  console.log({ response });
  dispatch({ user: 2 })
}
