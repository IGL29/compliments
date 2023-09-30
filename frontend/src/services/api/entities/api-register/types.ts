export type PostRegisterRequestPayload = IRegisterData;

export interface IRegisterData {
  email: string;
  password: string;
  username: string;
  phone: number;
}
