import HttpRequester from '../core/HttpRequester';
import { BaseAPI } from './base-api';

const ChatAPIInstance = new HttpRequester();

class ChatAPI extends BaseAPI {
  create() {
    return ChatAPIInstance.post('/', { title: 'string' });
  }

  request() {
    return ChatAPIInstance.get('/full');
  }
}
