import { HttpService } from '~src/services/Http';
import {
  GetAdditionallyRequestOptions,
  GetAdditionallyResponsePayload,
  GetProductRequestOptions,
  GetProductResponsePayload,
  GetProductsRequestOptions,
  GetProductsResponsePayload,
} from './types';

class ApiProductsService {
  private readonly api = '/products';
  private readonly nestedAdditionallyApi = '/additionally';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public getProducts(options?: GetProductsRequestOptions) {
    return this.http.get<GetProductsResponsePayload>(this.fullUrl, options);
  }

  public getProduct(options: GetProductRequestOptions) {
    return this.http.get<GetProductResponsePayload, undefined>(`${this.fullUrl}/${options.url}`);
  }

  public getAdditionallyProducts(options?: GetAdditionallyRequestOptions) {
    return this.http.get<GetAdditionallyResponsePayload>(`${this.fullUrl}/${this.nestedAdditionallyApi}`, options);
  }
}

export { ApiProductsService };
