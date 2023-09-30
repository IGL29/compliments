import { HttpService } from '~src/services/Http';
import { GetPromoResponsePayload } from './types';

class ApiPromoService {
  private readonly api = '/promo';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public getPromo() {
    return this.http.get<GetPromoResponsePayload>(this.fullUrl);
  }
}

export { ApiPromoService };
