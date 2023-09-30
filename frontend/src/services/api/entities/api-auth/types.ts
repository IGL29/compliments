export type PostAuthRequestPayload = IAuthData;

export type PostAuthResponsePayload = { token: Token };

export interface IAuthData {
  email: string;
  password: string;
}

export type Token = string;
