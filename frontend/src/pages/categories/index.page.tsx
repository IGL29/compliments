import cn from 'classnames';

import styles from './style.module.scss';
import { CatalogLink } from '~components/CatalogLink/CatalogLink';
import { useViewportSize } from '~hooks/useViewportSize';
import { SubscribeBannerContainer } from '~src/containers/SubscribeBannerContainer/SubscribeBannerContainer';
import { CEO } from '~src/data/CEO';
import { StoreService } from '~src/services/StoreService/StoreService';
import { requestShopContacts } from '~src/store/features/shopContacts';

export { onBeforeRender };

async function onBeforeRender() {
  const store = new StoreService().store;

  if (!store.getState().shopContacts.data) {
    await store.dispatch(requestShopContacts());
  }

  return {
    pageContext: {
      PRELOADED_STATE: store.getState(),
    },
  };
}

export { getDocumentProps };

function getDocumentProps() {
  return {
    title: CEO.CATEGORIES.title,
    description: CEO.CATEGORIES.description,
  };
}

function Page() {
  const [viewportSizes] = useViewportSize();

  const isSetIsMiniLink = viewportSizes.width <= 992;
  const isSetIsAccentText = isSetIsMiniLink;

  const linksData = [
    {
      category: 'Holiday',
      isMini: isSetIsMiniLink,
      isAccent: isSetIsAccentText,
      isAnimate: true,
    },
    {
      category: 'She',
      isMini: isSetIsMiniLink,
      isAccent: isSetIsAccentText,
      isAnimate: true,
    },
    {
      category: 'Corporate',
      isMini: isSetIsMiniLink,
      isAccent: isSetIsAccentText,
      isAnimate: true,
    },
    {
      category: 'He',
      isMini: isSetIsMiniLink,
      isAccent: isSetIsAccentText,
      isAnimate: true,
    },
    {
      category: 'BirthChild',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      category: 'Children',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      purpose: 'Bathhouse',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      purpose: 'Cosmetic',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      purpose: 'Guests',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      purpose: 'Kitchen',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      subCategoryHoliday: 'Birthday',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      subCategoryHoliday: 'Easter',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      subCategoryHoliday: 'February23',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      subCategoryHoliday: 'March8th',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      subCategoryHoliday: 'MotherDay',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      subCategoryHoliday: 'NewYear',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      subCategoryHoliday: 'September1st',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
    {
      subCategoryHoliday: 'Teacher',
      isMini: true,
      isAccent: true,
      isAnimate: true,
    },
  ] as const;

  return (
    <div className="categories">
      <div className={cn(styles['categories__categories-section'], styles['categories-section'])}>
        <div className="site-container">
          <h1 className={cn(styles['categories-section__title'])}>Категории подарков</h1>

          <ul className={cn(styles['categories-section__list'], 'reset-list')}>
            {linksData.map((linkData, index) => {
              return (
                <li className={cn(styles['categories-section__category-item'], styles['category-item'])} key={index}>
                  <CatalogLink rootClassName={cn(styles['category-item__link'])} toCatalog {...linkData} />
                </li>
              );
            })}

            <li className={cn(styles['categories-section__category-item--all'])}>
              <CatalogLink
                rootClassName={cn(styles['category-item__link'], styles['category-item__link--all'])}
                isMini
                toCatalog
                isCustom
                customText="Все подарки"
              />
            </li>
          </ul>
        </div>
      </div>

      <SubscribeBannerContainer />
    </div>
  );
}

export { Page };
