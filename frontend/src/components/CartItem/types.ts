import { ICartItem } from '~src/services/api/entities/api-cart';
import { IProduct } from '~src/services/api/entities/api-products/types';

export interface IProps {
  rootClassName?: string;
  cartItem: ICartItem;
  isDescription?: boolean;
  cbDeleteProduct?: (arg: { id: IProduct['id'] }) => void;
  cbChangeCountProduct?: (arg: { count: ICartItem['count']; id: IProduct['id'] }) => void;
}
