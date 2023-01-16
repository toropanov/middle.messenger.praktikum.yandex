import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

const UserRequestInstance = new HttpRequester('/user');

class UserAPI extends BaseAPI {
  searchByID(id) {
    return UserRequestInstance.get(`/get/${id}`)
  }

  searchByLogin(data) {
    return UserRequestInstance.post('/search', { data })
  }
}

export default new UserAPI();
