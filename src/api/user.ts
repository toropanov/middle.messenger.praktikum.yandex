import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

import { SearchByLoginRequestData } from '../types';

const UserRequestInstance = new HttpRequester('/user');

class UserAPI extends BaseAPI {
  searchByID(id: number) {
    return UserRequestInstance.get(`/${id}`)
  }

  searchByLogin(data: SearchByLoginRequestData) {
    return UserRequestInstance.post('/search', { data })
  }
}

export default new UserAPI();
