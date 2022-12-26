import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

import { SigninRequestData, SignupRequestData } from '../types';

const requestInstance = new HttpRequester('/auth');

class AuthAPI extends BaseAPI {
  getUser() {
    return requestInstance.get('/user');
  }

  signIn(data: SigninRequestData) {
    return requestInstance.post('/signin', { data });
  }

  signUp(data: SignupRequestData) {
    return requestInstance.post('/signup', { data });
  }

  signOut() {
    return requestInstance.post('/logout');
  }
}

export default new AuthAPI();
