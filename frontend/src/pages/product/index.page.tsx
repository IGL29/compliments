import cn from 'classnames';
import styles from './style.module.scss';
import { DeliveryInfo } from '~src/components/DeliveryInfo/DeliveryInfo';
import { PopularProductsContainer } from '~src/containers/PopularProductsContainer/PopularProductsContainer';
import { SubscribeBannerContainer } from '~src/containers/SubscribeBannerContainer/SubscribeBannerContainer';
import { ProductForOrderContainer } from '~src/containers/ProductForOrderContainer';
import { CEO } from '~src/data/CEO';
import { PageContextServer } from '~src/renderer/types';
import { StoreService } from '~src/services/StoreService/StoreService';
import { requestAdditionallyProductsAsync } from '~src/store/features/additionallyProducts';
import { requestOfferProductsAsync } from '~src/store/features/offerProducts';
import { requestProductAsync } from '~src/store/features/product';
import { requestShopContacts } from '~src/store/features/shopContacts';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContextServer) {
  const store = new StoreService().store;

  const reqContactsPromise = !store.getState().shopContacts.data
    ? store.dispatch(requestShopContacts())
    : Promise.resolve();

  await Promise.all([
    store.dispatch(requestProductAsync(pageContext.routeParams.productId)),
    store.dispatch(requestAdditionallyProductsAsync()),
    store.dispatch(requestOfferProductsAsync()),
    reqContactsPromise,
  ]);

  return {
    pageContext: {
      PRELOADED_STATE: store.getState(),
    },
  };
}

export { getDocumentProps };

function getDocumentProps() {
  return {
    title: CEO.PRODUCT.title,
    description: CEO.PRODUCT.description,
  };
}

const Page = () => {
  return (
    <div className={cn(styles['page'])}>
      <ProductForOrderContainer additionallySectionClassName={styles['page__additionally-section']} />

      <section className={cn(styles['page__delivery-info-section'], styles['delivery-info-section'])}>
        <div className={cn(styles['delivery-info-section__container'], 'site-container')}>
          <h2 className={cn(styles['delivery-info-section__title'])}>Как получить заказ</h2>

          <div className={cn(styles['delivery-info-section__wrapper-info'])}>
            <DeliveryInfo />
          </div>
        </div>
      </section>

      <section className={cn(styles['page__similar-products-section'], styles['similar-products-section'])}>
        <div className={cn(styles['similar-products-section__container'], 'site-container')}>
          <h2 className={cn(styles['similar-products-section__title'])}>Похожие товары</h2>
        </div>

        <PopularProductsContainer rootClassName={cn(styles['similar-products-section__products-slider'])} />
      </section>

      <SubscribeBannerContainer />
    </div>
  );
};

export { Page };
