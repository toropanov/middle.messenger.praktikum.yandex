import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

import { SigninRequestData, SignupRequestData } from '../types';

const requestInstance = new HttpRequester('/auth');

class AuthAPI extends BaseAPI {
  getUser() {
    return requestInstance.get('/auth/user');
  }

  signIn(data: SigninRequestData) {
    return requestInstance.post('/sign_in', { data });
  }

  signUp(data: SignupRequestData) {
    return requestInstance.post('/sign_up', { data });
  }

  logout() {
    return requestInstance.post('/logout');
  }
}

export default new AuthAPI()
