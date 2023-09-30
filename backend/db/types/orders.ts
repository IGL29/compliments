import { DeliverMethod } from '../../services/OrderService';
import { ICartItem } from './carts';
import { IUserAddress } from './users';

export interface IOrder {
  id: string;
  userId?: string;
  cart: ICartItem[];
  status: OrderStatus;
  number: number;
  date: Date;
}

export interface ISavedOrder {
  id: string;
  userId?: string;
  address: IUserAddress;
  cart: ICartItem[];
  status: OrderStatus;
  number: number;
  comment: string;
  deliveryMethod: DeliverMethod;
  phone: string;
  date: Date;
}

export type OrderStatus = 'pending' | 'paid' | 'delivered';
