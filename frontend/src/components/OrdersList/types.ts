import { IOrder } from '~src/services/api/entities/api-orders/types';

export interface IProps {
  orders: IOrder[];
  rootClassName?: string;
}
