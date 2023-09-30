import { ICartItem } from '~src/services/api/entities/api-cart';

export interface IProps {
  productItem: ICartItem;
  isMini?: boolean;
  cbAddToCart: (product: ICartItem) => void;
  cbChangeProductCount: (product: ICartItem) => void;
}
