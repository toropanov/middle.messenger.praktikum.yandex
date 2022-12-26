import AuthAPI from '../api/auth';
import Router from '../core/Router';

import { Routes } from '../types';

export const signin = async (dispatch, data) => {
  const { status, response } = await AuthAPI.signIn(data).then(res => res);

  if (status === 200) {
    dispatch(getUser, true);
  } else {
    dispatch({ error: response.responseText });
  }
}

export const signup = async (dispatch, data) => {
  const { status } = await AuthAPI.signUp(data);

  if (status === 200) {
    dispatch(getUser, true);
  }
}

export const signOut = async (dispatch, data) => {
  await AuthAPI.signOut();

  Router.go(Routes.MAIN);
}

export const getUser = async (dispatch, withRedirect) => {
  const { status, response } = await AuthAPI.getUser();

  if (status === 200) {    
    dispatch({
      user: JSON.parse(response) // to modify value
    });
  
    if (withRedirect) {
      Router.go(Routes.CHAT);
    }
  }
}

