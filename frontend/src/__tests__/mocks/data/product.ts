import { IAdditionallyProduct, IPreviewProduct } from '~src/services/api/entities/api-products/types';

export const getMockAdditionallyProduct = ({
  discount = 100,
  id = '1',
  img = 'image',
  itemNumber = 1,
  price = 1000,
  title = 'Some name of additionally product',
}: Partial<IAdditionallyProduct> = {}): IAdditionallyProduct => {
  return { discount, id, img, itemNumber, price, title };
};

export const getMockPreviewProduct = ({
  discount = 100,
  id = '1',
  img = 'image',
  itemNumber = 1,
  price = 1000,
  category = 'holiday',
  composition = 'edible',
  compositionItems = ['item'],
  packaging = 'box',
  purpose = 'kitchen',
  subcategory = 'birthday',
  title = 'Some name of additionally product',
}: Partial<IPreviewProduct> = {}): IPreviewProduct => {
  return {
    discount,
    id,
    img,
    category,
    composition,
    compositionItems,
    packaging,
    purpose,
    subcategory,
    itemNumber,
    price,
    title,
  };
};
