import { ICartItem } from '~src/services/api/entities/api-cart';

export interface IProps {
  rootClassName?: string;
  products: ICartItem[];
  isLoading?: boolean;
  error?: string | null;
  cbChangeProductCount: (product: ICartItem) => void;
  cbAddToCart: (product: ICartItem) => void;
  cbRepeatRequest?: () => void;
}
