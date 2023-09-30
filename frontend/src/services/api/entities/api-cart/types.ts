import { AuthorizationHeader } from '~src/types/token';
import { IAdditionallyProduct, IPreviewProduct, IProduct } from '../api-products/types';

export type GetCartRequestOptions = { headers: AuthorizationHeader };
export type GetCartResponsePayload = Cart;

export type PostCartRequestOptions = { headers: AuthorizationHeader };
export type PostCartRequestPayload = { count: number; product: IAdditionallyProduct | IProduct }[];
export type PostCartResponsePayload = Cart;

export type PatchCartRequestOptions = { headers: AuthorizationHeader };
export type PatchCartRequestPayload = { count: ICartItem['count']; id: IProduct['id'] };
export type PatchCartResponsePayload = Cart;

export type DeleteCartRequestOptions = { headers: AuthorizationHeader; data: DeleteCartRequestPayload };
export type DeleteCartRequestPayload = { id: IProduct['id'] };
export type DeleteCartResponsePayload = Cart;

export interface ICartItem {
  count: number;
  product: IPreviewProduct | IAdditionallyProduct;
}

export type Cart = ICartItem[];
