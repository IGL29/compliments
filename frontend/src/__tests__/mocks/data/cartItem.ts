import { ICartItem } from '~src/services/api/entities/api-cart';
import { getMockPreviewProduct } from './product';

export const getMockCartItem = ({
  count = 1,
  product = getMockPreviewProduct(),
}: { count?: number; product?: Partial<ICartItem['product']> } = {}): ICartItem => ({
  count,
  product: getMockPreviewProduct(product),
});
