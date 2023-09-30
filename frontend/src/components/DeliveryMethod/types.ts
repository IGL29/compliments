import { DeliveryMethod } from '~src/services/api/entities/api-orders/types';

export interface IProps {
  value: DeliveryMethod;
}

export type MethodDescr = {
  [key in DeliveryMethod]: string;
};
