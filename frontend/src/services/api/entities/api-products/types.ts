import { AuthorizationHeader } from '~src/types/token';

export type GetProductsRequestOptions = { headers?: AuthorizationHeader; params?: IProductsParams };
export type GetProductsResponsePayload = IPaginationProducts<IPreviewProduct[]>;

export type GetProductRequestOptions = { headers?: AuthorizationHeader; url: GetProductRequestPayload };
export type GetProductRequestPayload = IProduct['id'];
export type GetProductResponsePayload = IProduct;

export type GetAdditionallyRequestOptions = { headers?: AuthorizationHeader; params?: IProductsParams };
export type GetAdditionallyResponsePayload = IPaginationProducts<IAdditionallyProduct[]>;

export interface IProductsParams {
  category?: Array<ProductCategory>;
  subcategory?: Array<IProduct['subcategory']>;
  composition?: Array<ProductComposition>;
  purpose?: Array<ProductPurpose>;
  packaging?: Array<ProductPackaging>;
  page?: number;
  count?: number;
  sort?: Sorting;
}

export interface IPaginationProducts<T> {
  data: T;
  page: number;
  pages: number;
  count: number;
}

export interface IAdditionallyProduct {
  id: string;
  title: string;
  img: string;
  price: number;
  discount: number;
  itemNumber: number;
}

export interface IProduct {
  id: string;
  title: string;
  img: IProductImg;
  price: number;
  discount: number;
  category: ProductCategory;
  subcategory: SubCategory[IProduct['category']];
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

export interface IPreviewProduct extends Omit<IProduct, 'img' | 'isCanDelivered' | 'sizes'> {
  img: string;
}

export type Sorting = 'asc' | 'desc';

export type ProductPackaging = 'basket' | 'packet' | 'box';

export type ProductPurpose = 'kitchen' | 'guests' | 'bathhouse' | 'cosmetic';

export type ProductComposition = 'edible' | 'inedible';

export type SubCategory = {
  holiday: HolidaySubCategory;
  'birth-child': null;
  children: null;
  she: null;
  he: null;
  corporate: null;
};

export type HolidaySubCategory =
  | 'easter'
  | 'mother-day'
  | 'easter'
  | 'birthday'
  | 'september1st'
  | 'february23'
  | 'march8th'
  | 'new-year'
  | 'teacher';

export type ProductCategory = keyof SubCategory;

export interface IProductImg {
  preview: string;
  other: string[];
}
