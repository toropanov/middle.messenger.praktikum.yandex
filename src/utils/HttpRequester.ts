import { API_URL, HTTP_REQUEST_METHODS } from '../consts';
import { IRequest } from '../types';

export default class HttpRequester {
  private defaultHeaders = {
    "Content-Type": "application/x-www-form-urlencoded"
  };

  dataToQuery(data: Record<string, string>) {
    if (!data) return null;
  
    return '?' + new URLSearchParams(data).toString()
  }

  get({ url, data, timeout }: IRequest) {
    return this.request(url, { data, method: HTTP_REQUEST_METHODS.GET }, timeout);
  }

  post ({ url, data, timeout }: IRequest) {
    return this.request(url, { data, method: HTTP_REQUEST_METHODS.POST }, timeout);
  }

  put ({ url, data, timeout }: IRequest) {
    return this.request(url, { data, method: HTTP_REQUEST_METHODS.PUT }, timeout);
  }

  delete ({ url, data, timeout }: IRequest) {
    return this.request(url, { data, method: HTTP_REQUEST_METHODS.DELETE }, timeout);
  }

  private request(path: string, {
    headers: customHeaders = {},
    method = HTTP_REQUEST_METHODS.GET,
    data = {},
    async = true
  }, timeout = 2000) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const queryData = this.dataToQuery(data);
      const headers: { [key: string]: string } = {
        ...this.defaultHeaders,
        ...customHeaders
      }

      xhr.open(method, `${API_URL}/${path}`, async);
      xhr.timeout = timeout;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);
      xhr.ontimeout = () => reject(xhr);
    
      xhr.send(queryData);
    });
  }
}
