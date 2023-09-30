import { HttpService } from '~src/services/Http';
import { GetContactsResponsePayload } from './types';

class ApiContactsService {
  private readonly api = '/contacts';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public getContacts() {
    return this.http.get<GetContactsResponsePayload>(this.fullUrl);
  }
}

export { ApiContactsService };
