import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

const ResourcesAPIInstance = new HttpRequester('/resources');

class ResourcesAPI extends BaseAPI {
  upload(data) {
    return ResourcesAPIInstance.post('', { data, headers: { } });
  }
}

export default new ResourcesAPI();
