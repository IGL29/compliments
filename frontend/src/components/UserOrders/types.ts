import type { IProps as OrdersListProps } from '~components/OrdersList';

export interface IProps extends OrdersListProps {
  rootClassName?: string;
  error: string | null;
  isLoading: boolean;
  cbRepeatRequestOrders: () => void;
}
