import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

const requestInstance = new HttpRequester('/user');

class ProfileAPI extends BaseAPI {
  changeProfile(data) {
    return requestInstance.put('/profile', { data });
  }

  changeAvatar(data) {
    return requestInstance.put('/profile/avatar', { data, headers: { } });
  }

  changePassword(data) {
    return requestInstance.put('/password', { data });
  }
}

export default new ProfileAPI();
