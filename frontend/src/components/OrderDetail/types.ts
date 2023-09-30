import { IOrder } from '~src/services/api/entities/api-orders/types';

export interface IProps {
  data: IOrder | null;
  isLoading: boolean;
  error: string | null;
  cbRepeatRequest: () => void;
}
