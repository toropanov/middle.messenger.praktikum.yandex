import AuthAPI from '../api/auth';
import Store from '../core/Store';
import Router from '../core/Router';

import { Routes } from '../types';

export const signin = async (store, action) => {
  const { response } = await AuthAPI.signIn(action).then(res => res);

  console.log(response);

  Store.dispatch(getUser)
}

export const signup = async (store, action) => {
  const response = await AuthAPI.signUp(action);

  console.log({ response });


}

export const getUser = async (store, action) => {
  console.log({ store, action });
  const response = await AuthAPI.getUser(action);

  Store.setState({
    user: response // to modify value
  });

  Router.go(Routes.CHAT);

  console.log(Store.getState());
}
