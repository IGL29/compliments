import { ClientOptions } from '../httpClient';
import { HttpClientService } from '../httpClient/HttpClient';

class HttpService {
  private static instance: HttpService;
  private httpClient: HttpClientService;

  constructor() {
    if (HttpService.instance) {
      return HttpService.instance;
    }
    HttpService.instance = this;
    this.httpClient = new HttpClientService();
  }

  public get<T = unknown, U = unknown>(url: string, options?: ClientOptions<U>) {
    return this.httpClient.get<T>(url, options);
  }

  public post<T = unknown, U = unknown>(url: string, data: U, options?: ClientOptions<U>) {
    return this.httpClient.post<T>(url, data, options);
  }

  public put<T = unknown, U = unknown>(url: string, data: U, options: ClientOptions<U>) {
    return this.httpClient.put<T>(url, data, options);
  }

  public patch<T = unknown, U = unknown>(url: string, data: U, options: ClientOptions<U>) {
    return this.httpClient.patch<T>(url, data, options);
  }

  public delete<T = unknown, U = unknown>(url: string, options?: ClientOptions<U>) {
    return this.httpClient.delete<T>(url, options);
  }
}

export { HttpService };
