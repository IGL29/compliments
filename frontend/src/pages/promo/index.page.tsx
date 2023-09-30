import cn from 'classnames';

import { SubscribeBannerContainer } from '~src/containers/SubscribeBannerContainer/SubscribeBannerContainer';
import { PromotionsContainer } from '~src/containers/PromotionsContainer';
import styles from './style.module.scss';
import { CEO } from '~src/data/CEO';
import { StoreService } from '~src/services/StoreService/StoreService';
import { requestPromotionsAsync } from '~src/store/features/promo';
import { requestShopContacts } from '~src/store/features/shopContacts';

export { onBeforeRender };

async function onBeforeRender() {
  const store = new StoreService().store;

  const reqContactsPromise = !store.getState().shopContacts.data
    ? store.dispatch(requestShopContacts())
    : Promise.resolve();
  await Promise.all([store.dispatch(requestPromotionsAsync()), reqContactsPromise]);

  return {
    pageContext: {
      PRELOADED_STATE: store.getState(),
    },
  };
}

export { getDocumentProps };

function getDocumentProps() {
  return {
    title: CEO.PROMO.title,
    description: CEO.PROMO.description,
  };
}

function Page() {
  return (
    <div className={cn(styles['promo-page'])}>
      <div className={cn(styles['promo-page__container'], 'site-container')}>
        <h1 className={cn(styles['promo-page__title'], 'site-title')}>Наши акции</h1>

        <PromotionsContainer />
      </div>

      <SubscribeBannerContainer />
    </div>
  );
}

export { Page };
