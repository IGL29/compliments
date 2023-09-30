import { Cart, ICartItem } from '~src/services/api/entities/api-cart';
import { IProduct } from '~src/services/api/entities/api-products/types';

export interface IProps {
  rootClassName?: string;
  cartProducts: Cart;
  isLoadingCart?: boolean;
  errorLoadingCart?: null | string;
  cbChangeCountProduct: (arg: { count: ICartItem['count']; id: IProduct['id'] }) => void;
  cbDeleteProduct: (arg: { id: IProduct['id'] }) => void;
  cbRepeatCartRequest?: () => void;
}
