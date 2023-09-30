import { IProduct } from '~src/services/api/entities/api-products/types';
import { EContentVariant } from '../DeliveryResolve/DeliveryResolve';

export interface IProps {
  rootClassName?: string;
  product: IProduct | null;
  isLoading: boolean;
  loadingError?: string | null;
  productCount: number;
  cbChangeProductCount: (count: number) => void;
  cbAddToCart: () => void;
  cbRepeatRequest: () => void;
}

export type ResolvedDelivery = typeof EContentVariant.RESOLVED | typeof EContentVariant.UNRESOLVED;
