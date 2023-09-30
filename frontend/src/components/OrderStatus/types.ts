import { OrderStatus } from '~src/services/api/entities/api-orders/types';

export interface IProps {
  rootClassName?: string;
  status: OrderStatus;
}
