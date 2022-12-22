import HttpRequester from '../core/HttpRequester';
import { BaseAPI } from './base-api';

const ChatAPIInstance = new HttpRequester('/chats');

class ChatAPI extends BaseAPI {
  getChains() {
    return ChatAPIInstance.get('/');
  }

  sendMessage(data) {
    return ChatAPIInstance.post('/', { data });
  }

  request() {
    return ChatAPIInstance.get('/full');
  }
}

export default new ChatAPI();
