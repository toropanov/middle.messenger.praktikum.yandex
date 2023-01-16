import HttpRequester from '../core/HttpRequester';
import { BaseAPI } from './base-api';

const ChatAPIInstance = new HttpRequester('/chats');

class ChatAPI extends BaseAPI {
  getChains() {
    return ChatAPIInstance.get('/');
  }

  create(data) {
    return ChatAPIInstance.post('/', { data });
  }

  delete(data) {
    return ChatAPIInstance.delete('/', { data });
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

  addParticipant(data) {
    return ChatAPIInstance.put(`/users`, { data })
  }

  deleteParticipant(data) {
    return ChatAPIInstance.delete(`/users`, { data })
  }
}

export default new ChatAPI();
