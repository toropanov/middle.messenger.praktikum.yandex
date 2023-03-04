import HttpRequester from '../core/HttpRequester';
import { BaseAPI } from './base-api';

const ChatAPIInstance = new HttpRequester('/chats');
const UserAPIInstance = new HttpRequester('/user');

class ChatAPI extends BaseAPI {
  getChains() {
    return ChatAPIInstance.get('/');
  }

  create(data) {
    return ChatAPIInstance.post('/', { data });
  }

  sendMessage(data) {
    return ChatAPIInstance.post('/', { data });
  }

  request() {
    return ChatAPIInstance.get('/full');
  }

  getChatToken(id: number) {
    return ChatAPIInstance.post(`/token/${id}`);
  }

  getParticipants(chatID) {
    return ChatAPIInstance.get(`/${chatID}/users`)
  }

  searchParticipantsByQuery(data) {
    return UserAPIInstance.post(`/search`, { data })
  }

  searchParticipantsByID(id) {
    return UserAPIInstance.post(`/${id}`)
  }
}

export default new ChatAPI();
