import { IAdditionallyProduct, IProduct } from '~src/services/api/entities/api-products/types';

export interface IProps {
  additionallySectionClassName?: string;
  additionallyProducts: IAdditionallyProduct[];
  productsLoadingError: string | null;
  additionallyLoadingError: string | null;
  product: IProduct | null;
  isProductLoading?: boolean;
  isAdditionallyProductsLoading?: boolean;
  productCount: number;
  selectedAdditionallyProducts: IAdditionallyProduct[];
  cbSetSelectedAdditionallyProducts: (product: IAdditionallyProduct) => void;
  cbChangeProductCount: (count: number) => void;
  cbAddToCart: () => void;
  cbRepeatRequestProduct: () => void;
  cbRepeatRequestAdditionally: () => void;
}
