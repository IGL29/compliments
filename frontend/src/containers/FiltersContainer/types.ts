import { IProduct } from '~src/services/api/entities/api-products/types';

export interface IProps {
  rootClassName?: string;
}

export type CategoryOption = NonNullable<IProduct['category']>;
export type SubCategoryOption = NonNullable<IProduct['subcategory']>;
export type CompositionOption = NonNullable<IProduct['composition']>;
export type PurposeOption = NonNullable<IProduct['purpose']>;
export type PackagingOption = NonNullable<IProduct['packaging']>;

export interface Options {
  category: CategoryOption;
  subcategory: SubCategoryOption;
  composition: CompositionOption;
  purpose: PurposeOption;
  packaging: PackagingOption;
}

export type FilterValues = { [k in keyof Options]: Options[k][] };
