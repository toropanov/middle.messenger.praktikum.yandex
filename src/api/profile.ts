import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

import {
  ProfileChangeRequestData,
  ProfileAvatarChangeRequestData,
  ProfilePasswordChangeRequestData
} from '../types';

const requestInstance = new HttpRequester('/user');

class ProfileAPI extends BaseAPI {
  changeProfile(data: ProfileChangeRequestData) {
    return requestInstance.put('/profile', { data });
  }

  changeAvatar(data: ProfileAvatarChangeRequestData) {
    return requestInstance.put('/profile/avatar', { data, headers: { } });
  }

  changePassword(data: ProfilePasswordChangeRequestData) {
    return requestInstance.put('/password', { data });
  }
}

export default new ProfileAPI();
