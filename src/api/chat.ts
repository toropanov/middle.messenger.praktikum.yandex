import HttpRequester from '../core/HttpRequester';
import { BaseAPI } from './base-api';

import {
  ChatCreateRequestData,
  ChatDeleteRequestData,
  ChatSendMessageRequestData,
  ChatAddParticipantsRequestData,
  ChatDeleteParticipantsRequestData,
} from '../types';

const ChatAPIInstance = new HttpRequester('/chats');

class ChatAPI extends BaseAPI {
  getChains() {
    return ChatAPIInstance.get('/');
  }

  create(data: ChatCreateRequestData) {
    return ChatAPIInstance.post('/', { data });
  }

  delete(data: ChatDeleteRequestData) {
    return ChatAPIInstance.delete('/', { data });
  }

  sendMessage(data: ChatSendMessageRequestData) {
    return ChatAPIInstance.post('/', { data });
  }

  request() {
    return ChatAPIInstance.get('/full');
  }

  getChatToken(id: number) {
    return ChatAPIInstance.post(`/token/${id}`);
  }

  getParticipants(chatID: number) {
    return ChatAPIInstance.get(`/${chatID}/users`)
  }

  addParticipants(data: ChatAddParticipantsRequestData) {
    return ChatAPIInstance.put(`/users`, { data })
  }

  deleteParticipants(data: ChatDeleteParticipantsRequestData) {
    return ChatAPIInstance.delete(`/users`, { data })
  }
}

export default new ChatAPI();
