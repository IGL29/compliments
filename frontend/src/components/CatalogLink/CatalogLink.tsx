import cn from 'classnames';

import {
  CategoryEnum,
  HolidaySubCategoryEnum,
  ProductPurposeEnum,
  category as categoryData,
  productPurpose as purposeData,
  holidaySubCategory as holidaySubCategoryData,
} from '~data/categories';
import { ROUTES_DATA } from '~data/routes';
import { categoryImages, purposeImages, subCategoryHolidayImages } from './data';
import styles from './style.module.scss';
import type { IProps } from './types';
import { HolidaySubCategory, ProductCategory, ProductPurpose } from '~src/services/api/entities/api-products/types';

const getLinkData = ({
  category,
  purpose,
  subCategoryHoliday,
}: {
  category?: keyof typeof CategoryEnum;
  subCategoryHoliday?: keyof typeof HolidaySubCategoryEnum;
  purpose?: keyof typeof ProductPurposeEnum;
}) => {
  if (category !== undefined) {
    return {
      ...categoryData[CategoryEnum[category]],
      urlParams: {
        category: categoryData[CategoryEnum[category]].urlParam,
      },
      img: categoryImages[CategoryEnum[category]],
    };
  }
  if (purpose !== undefined) {
    return {
      ...purposeData[ProductPurposeEnum[purpose]],
      urlParams: {
        purpose: purposeData[ProductPurposeEnum[purpose]].urlParam,
      },
      img: purposeImages[ProductPurposeEnum[purpose]],
    };
  }
  if (subCategoryHoliday !== undefined) {
    return {
      ...holidaySubCategoryData[HolidaySubCategoryEnum[subCategoryHoliday]],
      urlParams: {
        category: categoryData[CategoryEnum.Holiday].urlParam,
        subcategory: holidaySubCategoryData[HolidaySubCategoryEnum[subCategoryHoliday]].urlParam,
      },
      img: subCategoryHolidayImages[HolidaySubCategoryEnum[subCategoryHoliday]],
    };
  }
};

const getProductsParams = (urlParams: {
  category?: ProductCategory;
  subcategory?: HolidaySubCategory;
  purpose?: ProductPurpose;
}) => {
  let params = '';

  for (const [key, value] of Object.entries(urlParams)) {
    params += params === '' ? `?${key}=${value}` : `&${key}=${value}`;
  }

  return params;
};

const getRouteUrl = (toCategories?: boolean, toCatalog?: boolean) => {
  if (toCategories) {
    return ROUTES_DATA.CATEGORIES.url;
  }
  if (toCatalog) {
    return ROUTES_DATA.CATALOG.url;
  }
  return ROUTES_DATA.CATEGORIES.url;
};

const CatalogLink = (props: IProps) => {
  let params = '';
  let linkData;

  if (props.category || props.subCategoryHoliday || props.purpose) {
    linkData = getLinkData(props);
    params = linkData ? getProductsParams(linkData.urlParams) : '';
  }

  const routeUrl = getRouteUrl(props.toCategories, props.toCatalog);
  const url = routeUrl + params;

  const miniLinkClassName = props.isMini ? styles['link--mini'] : '';
  const miniTextClassName = props.isMini ? styles['link__text--mini'] : '';
  const accentTextClassName = props.isAccent ? styles['link__text--accent'] : '';
  const animateClassName = props.isAnimate ? styles['link--animate'] : '';

  const linkStyle = props.isCustom ? {} : { backgroundImage: `url(${linkData?.img})` };
  const linkText = props.isCustom ? props.customText : linkData?.title;

  return (
    <a
      className={cn(styles['link'], props.rootClassName, miniLinkClassName, animateClassName)}
      style={linkStyle}
      href={url}
      data-testid="catalogLink"
    >
      <p className={cn(styles['link__text'], miniTextClassName, accentTextClassName)}>{linkText}</p>
    </a>
  );
};

export { CatalogLink };
