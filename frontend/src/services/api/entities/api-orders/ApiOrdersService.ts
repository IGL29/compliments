import { HttpService } from '~src/services/Http';
import {
  GetOrderRequestOptions,
  GetOrderResponsePayload,
  GetOrdersRequestOptions,
  GetOrdersResponsePayload,
  PostOrderRequestOptions,
  PostOrderRequestPayload,
  PostOrderResponsePayload,
} from './types';

class ApiOrdersService {
  private readonly api = '/orders';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public getOrder(options: GetOrderRequestOptions) {
    return this.http.get<GetOrderResponsePayload>(`${this.fullUrl}/${options.url}`);
  }

  public getListOrders(options: GetOrdersRequestOptions) {
    return this.http.get<GetOrdersResponsePayload, GetOrderResponsePayload>(this.fullUrl, options);
  }

  public postOrder(data: PostOrderRequestPayload, options: PostOrderRequestOptions) {
    return this.http.post<PostOrderResponsePayload, PostOrderRequestPayload>(this.fullUrl, data, options);
  }
}

export { ApiOrdersService };
