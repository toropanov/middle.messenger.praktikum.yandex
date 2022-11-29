import { API_URL, HTTP_REQUEST_METHODS } from '../consts';
import { HttpRequestMethods } from '../types';

export class HttpRequester {
  private defaultHeaders = {
    "Content-Type": "application/x-www-form-urlencoded"
  };

  dataToQuery(data) {
    if (!data) return null;
  
    return '?' + new URLSearchParams(data).toString()
  }

  get(url: string, data) {
    return this.request(url, { data, method: HTTP_REQUEST_METHODS.GET });
  };

  post (url: string, data) {
    return this.request(url, { data, method: HTTP_REQUEST_METHODS.POST });
  };

  put (url: string, data) {
    return this.request(url, { data, method: HTTP_REQUEST_METHODS.PUT });
  };

  delete (url: string, data) {
    return this.request(url, { data, method: HTTP_REQUEST_METHODS.DELETE });
  };

  private request(path: string, {
    headers: customHeaders = {},
    method = HTTP_REQUEST_METHODS.GET,
    data,
    async = true
  }) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const queryData = this.dataToQuery(data);
      const headers = {
        ...this.defaultHeaders,
        customHeaders
      }

      xhr.open(method, `${API_URL}/${path}`, async);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);
    
      xhr.send(queryData);
    });
  }
}
