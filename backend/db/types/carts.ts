import { IAdditionallyProduct } from './additionallyProducts';
import { IPreviewProduct } from './products';

export interface ICartsItem {
  userId: string;
  inCart: ICartItem[];
}

export interface ICartItem {
  count: number;
  product: IPreviewProduct | IAdditionallyProduct;
}
