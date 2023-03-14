import AuthAPI from '../api/auth';
import Router from '../core/Router';

import { Routes, IDispatch, SignupRequestData, SigninRequestData } from '../types';
import { showResponseError } from './errors';

export const signin = async (dispatch: IDispatch, data: SigninRequestData) => {
  const { status, response } = await AuthAPI.signIn(data).then(res => res);
  
  if (status === 200) {
    location.reload();
  } else {
    const { reason } = JSON.parse(response);
    dispatch(showResponseError, reason);
  }
}

export const signup = async (dispatch: IDispatch, data: SignupRequestData) => {
  const { status, response } = await AuthAPI.signUp(data);

  if (status === 200) {
    dispatch(getUser, true);
  } else {
    const { reason } = JSON.parse(response);
    dispatch(showResponseError, reason);
  }
}

export const signOut = async () => {
  await AuthAPI.signOut();

  Router.go(Routes.MAIN);
}

export const getUser = async (dispatch: IDispatch, withRedirect: boolean) => {
  const { status, response } = await AuthAPI.getUser();

  if (status === 200) {
    dispatch({
      user: JSON.parse(response)
    });
  
    if (withRedirect) {
      Router.go(Routes.CHAT);
    }
  }
}

export const checkAuth = async () => {
  const { status } = await AuthAPI.getUser();

  if (status !== 200) {
    Router.go(Routes.MAIN);
  }
}
