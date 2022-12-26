import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

const requestInstance = new HttpRequester('/user', {
  "Content-Type": "multipart/form-data"
});

class ProfileAPI extends BaseAPI {
  changeProfile(data) {
    return requestInstance.put('/profile', { data });
  }

  changeAvatar(data) {
    return requestInstance.put('/profile/avatar', { data });
  }
}

export default new ProfileAPI();
