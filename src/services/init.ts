import AuthAPI from "../api/auth";

export const initApp = async (dispatch) => {
  const response = AuthAPI.getUser();

  console.log({ response });
}
