import HttpRequester from "../core/HttpRequester";
import { BaseAPI } from "./base-api";

const ProfileAPIInstance = new HttpRequester('/chats');

export class ProfileAPI extends BaseAPI {

}
