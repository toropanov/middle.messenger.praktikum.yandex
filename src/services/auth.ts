import AuthAPI from '../api/auth';
import Router from '../core/Router';

import { Routes, IDispatch } from '../types';
import { showResponseError } from './errors';

export const signin = async (dispatch: IDispatch, data) => {
  const { status, response } = await AuthAPI.signIn(data).then(res => res);
  
  if (status === 200) {
    dispatch(getUser, true);
  } else {
    const { reason } = JSON.parse(response);
    dispatch(showResponseError, reason);
  }
}

export const signup = async (dispatch: IDispatch, data) => {
  const { status, response } = await AuthAPI.signUp(data);

  if (status === 200) {
    dispatch(getUser, true);
  } else {
    const { reason } = JSON.parse(response);
    dispatch(showResponseError, reason);
  }
}

export const signOut = async (dispatch: IDispatch, data) => {
  Router.go(Routes.MAIN);
  await AuthAPI.signOut();
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

