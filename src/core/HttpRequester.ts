import { API_URL, HTTP_REQUEST_METHODS } from '../consts';
import { IRequestOptions } from '../types';

export default class HttpRequester {
  private defaultHeaders = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  basePath: string;
  headers: any;

  constructor(basePath: string, headers) {
    this.basePath = basePath || '/';
  }

  dataToQuery(data: Record<string, string>) {
    if (!data) return null;
  
    return new URLSearchParams(data).toString();
  }

  dataToForm(data) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }

  get(url: string, options?: IRequestOptions, timeout?: number) {
    return this.request(url, { ...options, method: HTTP_REQUEST_METHODS.GET }, timeout);
  }

  post(url: string, options?: IRequestOptions, timeout?: number) {
    return this.request(url, { ...options, method: HTTP_REQUEST_METHODS.POST }, timeout);
  }

  put (url: string, options: IRequestOptions, timeout?: number) {
    return this.request(url, {...options, method: HTTP_REQUEST_METHODS.PUT }, timeout);
  }

  delete (url: string, options: IRequestOptions, timeout?: number) {
    return this.request(url, { ...options, method: HTTP_REQUEST_METHODS.DELETE }, timeout);
  }

  private request(path: string, {
    method = HTTP_REQUEST_METHODS.GET,
    headers: customHeaders,
    data = {},
    async = true
  }, timeout = 2000) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const headers: { [key: string]: string } = customHeaders || this.defaultHeaders;

      const isQueryData = headers['Content-Type'] === 'application/x-www-form-urlencoded';
      const sendingData = isQueryData ? this.dataToQuery(data) : this.dataToForm(data);

      xhr.open(method, `${API_URL}${this.basePath}${path}`, async);
      xhr.timeout = timeout;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.withCredentials = true;

      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);
      xhr.ontimeout = () => reject(xhr);
    
      xhr.send(sendingData);
    });
  }
}
