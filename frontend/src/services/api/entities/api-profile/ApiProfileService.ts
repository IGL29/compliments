import { HttpService } from '~src/services/Http';
import {
  GetProfileRequestOptions,
  GetProfileResponsePayload,
  PatchProfileRequestOptions,
  PatchProfileRequestPayload,
  PatchProfileResponsePayload,
} from './types';

class ApiProfileService {
  private readonly api = '/profile';
  private readonly fullUrl: string;
  private readonly http = new HttpService();

  constructor(private url: string) {
    this.fullUrl = this.url + this.api;
  }

  public getProfile(options: GetProfileRequestOptions) {
    return this.http.get<GetProfileResponsePayload>(this.fullUrl, options);
  }

  public patchProfile(data: PatchProfileRequestPayload, options: PatchProfileRequestOptions) {
    return this.http.patch<PatchProfileResponsePayload>(this.fullUrl, data, options);
  }
}

export { ApiProfileService };
