import { HttpService } from '~src/services/Http';
import { PostFeedbackRequestPayload } from './types';

class ApiFeedbackService {
  private readonly api = '/feedback';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public postFeedback(data: PostFeedbackRequestPayload) {
    return this.http.post<undefined, PostFeedbackRequestPayload>(this.fullUrl, data);
  }
}

export { ApiFeedbackService };
