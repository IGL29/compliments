import { AuthorizationHeader } from '~src/types/token';
import { Cart } from '../api-cart';
import { IUserAddress } from '../api-profile/types';

export type GetOrderRequestOptions = { url: IOrder['id'] };
export type GetOrderResponsePayload = IOrder;

export type GetOrdersRequestOptions = { headers: AuthorizationHeader };
export type GetOrdersResponsePayload = IOrder[];

export type PostOrderRequestOptions = { headers?: AuthorizationHeader };
export type PostOrderResponsePayload = IOrder;
export type PostOrderRequestPayload = INewOrderData;

export interface IOrder {
  id: string;
  address: IUserAddress;
  deliveryMethod: DeliveryMethod;
  number: number;
  phone: number;
  status: OrderStatus;
  date: Date;
  cart: Cart;
}

export interface INewOrderData extends Pick<IOrder, 'address' | 'deliveryMethod' | 'phone'> {
  name: string;
  comment: string;
  cart?: Cart;
}

export type DeliveryMethod = 'pickup' | 'sdec' | 'courier';
export type OrderStatus = 'pending' | 'paid' | 'delivered';
