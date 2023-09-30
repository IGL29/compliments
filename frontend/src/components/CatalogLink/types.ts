import type { CategoryEnum, HolidaySubCategoryEnum, ProductPurposeEnum } from '~src/data/categories';

export interface IProps {
  rootClassName?: string;
  isMini?: boolean;
  isAccent?: boolean;
  category?: keyof typeof CategoryEnum;
  subCategoryHoliday?: keyof typeof HolidaySubCategoryEnum;
  purpose?: keyof typeof ProductPurposeEnum;
  toCategories?: boolean;
  toCatalog?: boolean;
  isCustom?: boolean;
  customText?: string;
  isAnimate?: boolean;
}
