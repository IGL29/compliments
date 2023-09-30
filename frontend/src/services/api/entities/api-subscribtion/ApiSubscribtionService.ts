import { HttpService } from '~src/services/Http';
import {
  DeleteSubscribtionRequestOptions,
  DeleteSubscribtionRequestPayload,
  DeleteSubscribtionResponsePayload,
  PostSubscribtionRequestOptions,
  PostSubscribtionRequestPayload,
  PostSubscribtionResponsePayload,
} from './types';

class ApiSubscribtionService {
  private readonly api = '/subscribtion';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public postSubscribtion(data?: PostSubscribtionRequestPayload, options?: PostSubscribtionRequestOptions) {
    return this.http.post<PostSubscribtionResponsePayload, PostSubscribtionRequestPayload | void>(
      this.fullUrl,
      data,
      options,
    );
  }

  public deleteSubscribtion(options?: DeleteSubscribtionRequestOptions) {
    return this.http.delete<DeleteSubscribtionResponsePayload, DeleteSubscribtionRequestPayload>(this.fullUrl, options);
  }
}

export { ApiSubscribtionService };
