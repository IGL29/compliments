import { AuthorizationHeader } from '~src/types/token';

export type GetProfileRequestOptions = { headers: AuthorizationHeader };
export type GetProfileResponsePayload = IUser;

export type PatchProfileRequestOptions = { headers: AuthorizationHeader };
export type PatchProfileRequestPayload = IUpdateUserData;
export type PatchProfileResponsePayload = IUser;

export type IUpdateUserData = Omit<IUser, 'discount' | 'purchaseAmount'>;

export interface IUser {
  email: string;
  name: string;
  discount: number;
  address: IUserAddress;
  phone: number;
  isSubscribe: boolean;
  purchaseAmount: number;
}

export interface IUserAddress {
  city: string;
  street: string;
  house: string;
  entrance?: string;
  apartment?: string;
}
