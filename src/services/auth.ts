import AuthAPI from '../api/auth';
import Router from '../core/Router';

import { Routes } from '../types';

export const signin = async (dispatch, data) => {
  const { status, response } = await AuthAPI.signIn(data).then(res => res);

  if (status === 200) {
    dispatch(getUser);
  } else {
    dispatch({ error: response.responseText });
  }
}

export const signup = async (dispatch, data) => {
  const { status } = await AuthAPI.signUp(data);

  if (status === 200) {
    dispatch(getUser);
  }
}

export const getUser = async (dispatch, data) => {
  const { status, response } = await AuthAPI.getUser(data);

  if (status === 200) {    
    dispatch({
      user: response // to modify value
    });
  
    Router.go(Routes.CHAT);
  }

}

