import { HttpService } from '~src/services/Http';
import {
  GetCartRequestOptions,
  GetCartResponsePayload,
  PostCartRequestOptions,
  PostCartRequestPayload,
  PostCartResponsePayload,
  PatchCartRequestOptions,
  PatchCartRequestPayload,
  PatchCartResponsePayload,
  DeleteCartRequestOptions,
  DeleteCartRequestPayload,
  DeleteCartResponsePayload,
} from './types';

class ApiCartService {
  private readonly api = '/cart';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public getCart(options: GetCartRequestOptions) {
    return this.http.get<GetCartResponsePayload>(this.fullUrl, options);
  }

  public postCart(data: PostCartRequestPayload, options: PostCartRequestOptions) {
    return this.http.post<PostCartResponsePayload, PostCartRequestPayload>(this.fullUrl, data, options);
  }

  public patchCart(data: PatchCartRequestPayload, options: PatchCartRequestOptions) {
    return this.http.patch<PatchCartResponsePayload, PatchCartRequestPayload>(this.fullUrl, data, options);
  }

  public deleteCart(options: DeleteCartRequestOptions) {
    return this.http.delete<DeleteCartResponsePayload, DeleteCartRequestPayload>(this.fullUrl, options);
  }
}

export { ApiCartService };
