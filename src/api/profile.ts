import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

const requestInstance = new HttpRequester('/user');

class ProfileAPI extends BaseAPI {
  changeProfile(data) {
    return requestInstance.put('/profile', { data });
  }
}

export default new ProfileAPI();
