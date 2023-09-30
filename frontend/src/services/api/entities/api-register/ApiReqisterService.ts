import { HttpService } from '~src/services/Http';
import { PostRegisterRequestPayload } from './types';

class ApiRegisterService {
  private readonly api = '/register';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public postReqister(data: PostRegisterRequestPayload) {
    return this.http.post<undefined, PostRegisterRequestPayload>(this.fullUrl, data);
  }
}

export { ApiRegisterService };
