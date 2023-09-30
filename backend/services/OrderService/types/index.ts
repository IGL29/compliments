import { IUserAddress } from '../../../db/types/users';

export interface IRequestOrder {
  name: string;
  phone: string;
  address: IUserAddress;
  deliveryMethod: DeliverMethod;
  comment: string;
}

export type DeliverMethod = 'pickup' | 'sdec' | 'courier';
