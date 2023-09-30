import { AxiosResponse } from 'axios';
import { Options } from './clients/AxiosClient/types';

export type ClientOptions<T = unknown> = Options<T>;
export type ClientResponsePayload<T> = AxiosResponse<T>;
