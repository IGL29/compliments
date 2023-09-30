import { HttpService } from '~src/services/Http';
import { PostAuthRequestPayload, PostAuthResponsePayload } from './types';

class ApiAuthService {
  private readonly api = '/auth';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public postAuth(data: PostAuthRequestPayload) {
    return this.http.post<PostAuthResponsePayload, PostAuthRequestPayload>(this.fullUrl, data);
  }
}

export { ApiAuthService };
