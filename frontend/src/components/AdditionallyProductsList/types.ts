import { IAdditionallyProduct } from '~src/services/api/entities/api-products/types';

export interface IProps {
  products: IAdditionallyProduct[];
  selectedProducts: IAdditionallyProduct[];
  loadingError?: string | null;
  isLoading?: boolean;
  cbSetSelectedProducts: (product: IAdditionallyProduct) => void;
  cbRepeatRequest: () => void;
}
