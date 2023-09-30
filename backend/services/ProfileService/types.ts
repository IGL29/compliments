import { ISavedUser } from '~db/types';

export interface IUserPublic extends Omit<ISavedUser, 'password' | 'id'> {
  discount: number;
  phone: number;
  isSubscribe: boolean;
}

export interface IUpdateUser extends Omit<ISavedUser, 'password' | 'id'> {
  discount: number;
  phone: number;
  isSubscribe: boolean;
}
