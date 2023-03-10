import {
  useFakeXMLHttpRequest,
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic
} from 'sinon';
import HttpRequester from './HttpRequester';

describe('HttpRequester', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HttpRequester;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HttpRequester('/auth');
  });

  afterEach(() => {
    requests.length = 0;
  })

  it('.get() should send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).toBe('GET');
  });
  it('.post() should send POST request', () => {
    instance.post('/logout');

    const [request] = requests;

    expect(request.method).toBe('POST');
  });
});
