import HttpRequester from '../core/HttpRequester';
import { BaseAPI } from './base-api';

const ChatAPIInstance = new HttpRequester('/chats');

class ChatAPI extends BaseAPI {
  q2qw() {
    return ChatAPIInstance.post('/', { title: 'string' });
  }

  request() {
    return ChatAPIInstance.get('/full');
  }
}
