import { AxiosClientService } from './clients/AxiosClient/AxiosClient';
import type { ClientOptions } from './types';

class HttpClientService {
  private static instance: HttpClientService;
  private clientService: AxiosClientService;

  constructor() {
    if (HttpClientService.instance) {
      return HttpClientService.instance;
    }
    HttpClientService.instance = this;
    this.clientService = new AxiosClientService();
  }

  public get<T = unknown, U = unknown>(url: string, options?: ClientOptions<U>) {
    return this.clientService.get<T, U>(url, options);
  }

  public post<T = unknown, U = unknown>(url: string, data: U, options?: ClientOptions<U>) {
    return this.clientService.post<T, U>(url, data, options);
  }

  public put<T = unknown, U = unknown>(url: string, data: U, options: ClientOptions<U>) {
    return this.clientService.put<T, U>(url, data, options);
  }

  public patch<T = unknown, U = unknown>(url: string, data: U, options: ClientOptions<U>) {
    return this.clientService.patch<T, U>(url, data, options);
  }

  public delete<T = unknown, U = unknown>(url: string, options?: ClientOptions<U>) {
    return this.clientService.delete<T, U>(url, options);
  }
}

export { HttpClientService };
