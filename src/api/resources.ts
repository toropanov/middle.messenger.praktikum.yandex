import { BaseAPI } from "./base-api";
import HttpRequester from "../core/HttpRequester";

import { ResourcesUploadRequestData } from '../types';

const ResourcesAPIInstance = new HttpRequester('/resources');

class ResourcesAPI extends BaseAPI {
  upload(data: ResourcesUploadRequestData) {
    return ResourcesAPIInstance.post('', { data, headers: { } });
  }
}

export default new ResourcesAPI();
