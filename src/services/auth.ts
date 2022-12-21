import AuthAPI from '../api/auth';
// import Store from '../core/Store';
import Router from '../core/Router';

import { Routes } from '../types';

export const signin = async (dispatch, data, store) => {
  await AuthAPI.signIn(data).then(res => res);

  dispatch(getUser)
}

export const signup = async (store, action) => {
  const response = await AuthAPI.signUp(action);

  console.log({ response });


}

export const getUser = async (dispatch, data, store) => {
  console.log({ dispatch, data, store });
  const response = await AuthAPI.getUser(data);

  dispatch({
    user: response // to modify value
  });

  Router.go(Routes.CHAT);
}
