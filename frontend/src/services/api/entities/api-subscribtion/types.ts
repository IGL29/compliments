import { IMessageResponse } from '~src/services/Http/types';
import { AuthorizationHeader } from '~src/types/token';

export type PostSubscribtionRequestOptions = { headers: AuthorizationHeader };

export type PostSubscribtionRequestPayload = { email: string } | void;
export type PostSubscribtionResponsePayload = IMessageResponse;

export type DeleteSubscribtionRequestOptions =
  | { headers: AuthorizationHeader }
  | { data: DeleteSubscribtionRequestPayload };

export type DeleteSubscribtionRequestPayload = { email: string };
export type DeleteSubscribtionResponsePayload = IMessageResponse;
