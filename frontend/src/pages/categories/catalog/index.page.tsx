import cn from 'classnames';

import styles from './style.module.scss';
import { Button } from '~components/Button';
import { ROUTES_DATA } from '~data/routes';
import { useViewportSize } from '~hooks/useViewportSize';
import { SortingSelectContainer } from '~src/containers/SortingSelectContainer';
import { ProductsListContainer } from '~src/containers/ProductsListContainer/ProductsListContainer';
import { FiltersContainer } from '~src/containers/FiltersContainer';
import { ProductsPaginationContainer } from '~src/containers/ProductsPaginationContainer';
import { CEO } from '~src/data/CEO';
import { StoreService } from '~src/services/StoreService/StoreService';
import { requestShopContacts } from '~src/store/features/shopContacts';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { openFiltersModal } from '~src/store/features/modals';

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
    title: CEO.CATALOG.title,
    description: CEO.CATALOG.description,
  };
}

const Page = () => {
  const [_, breakpoints] = useViewportSize();
  const dispatch = useAppDispatch();

  const clickOpenFiltersHandler = () => dispatch(openFiltersModal());

  const miniButtonsJSX = (
    <div className={cn(styles['select-wrapper__btns-wrapper'], styles['btns-wrapper'])}>
      <Button
        rootClassName={cn(styles['btns-wrapper__filter-btn'])}
        iconWrapperClassName={cn(styles['btns-wrapper__icon-filter-btn'])}
        text="Фильтр"
        icon="filter"
        variant={5}
        onClick={clickOpenFiltersHandler}
      />

      <Button
        rootClassName={cn(styles['btns-wrapper__categories-link'])}
        iconWrapperClassName={cn(styles['btns-wrapper__icon-categories-link'])}
        isLink
        href={ROUTES_DATA.CATEGORIES.url}
        text="Категории каталога"
        icon="bar"
        variant={5}
      />
    </div>
  );

  const isRenderMiniButtons = breakpoints.equalAndBelow.md;
  const isRenderDesktopFilters = !isRenderMiniButtons;

  return (
    <div className={cn(styles['catalog-page'])}>
      <div className={cn(styles['catalog-page__container'], 'site-container')}>
        <h1 className={cn(styles['catalog-page__title'], 'site-title')}>Каталог подарков</h1>

        <div className={cn(styles['catalog-page__content-wrapper'], styles['content-wrapper'])}>
          {isRenderDesktopFilters && (
            <div className={cn(styles['content-wrapper__filters-wrapper'])}>
              <FiltersContainer rootClassName={cn(styles['content-wrapper__filters'])} />
            </div>
          )}

          <div className={cn(styles['content-wrapper__products-section-wrapper'], styles['products-section-wrapper'])}>
            <div className={cn(styles['products-section-wrapper__select-wrapper'], styles['select-wrapper'])}>
              <SortingSelectContainer rootClassName={cn(styles['select-wrapper__select'])} />

              {isRenderMiniButtons && miniButtonsJSX}
            </div>

            <ProductsListContainer rootClassName={cn(styles['products-section-wrapper__products-list'])} />

            <div className={cn(styles['products-section-wrapper__pagination-wrapper'])}>
              <ProductsPaginationContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Page };
