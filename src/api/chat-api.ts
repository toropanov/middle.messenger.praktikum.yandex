import HttpRequester from '../utils/HttpRequester';
import { BaseAPI } from './base-api';

import { API_PATHS } from '../consts';

const ChatAPIInstance = new HttpRequester(API_PATHS.CHAT);

class ChatAPI extends BaseAPI {
  create() {
    return ChatAPIInstance.post('/', { title: 'string' });
  }

  request() {
    return ChatAPIInstance.get('/full');
  }
}
