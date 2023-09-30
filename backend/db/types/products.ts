export interface IProduct {
  id: string;
  title: string;
  img: IProductImg;
  price: number;
  discount: number;
  category: ProductCategory;
  subcategory: SubCategory[ProductCategory];
  itemNumber: number;
  composition: ProductComposition;
  compositionItems: string[];
  purpose: ProductPurpose;
  packaging: ProductPackaging;
  isCanDelivered: boolean;
  sizes: {
    length: number;
    height: number;
    width: number;
    weight: number;
  };
}

export interface IPreviewProduct
  extends Omit<IProduct, 'img' | 'isCanDelivered' | 'sizes'> {
  img: string;
}

export type ProductPackaging = 'basket' | 'packet' | 'box';

export type ProductPurpose = 'kitchen' | 'guests' | 'bathhouse' | 'cosmetic';

export type ProductComposition = 'edible' | 'inedible';

export type SubCategory = {
  holiday: IHolidaySubCategory;
  birthChild: null;
  children: null;
  she: null;
  he: null;
  corporate: null;
};

export type IHolidaySubCategory =
  | 'easter'
  | 'motherDay'
  | 'easter'
  | 'birthday'
  | 'september1st'
  | 'february23'
  | 'march8th'
  | 'newYear';

export type ProductCategory =
  | 'she'
  | 'he'
  | 'children'
  | 'holiday'
  | 'birthChild'
  | 'corporate';

export interface IProductImg {
  preview: string;
  other: string[];
}
