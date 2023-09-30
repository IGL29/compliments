import { Button } from '~components/Button';
import styles from './style.module.scss';
import cn from 'classnames';
import { DeliveryInfo } from '~components/DeliveryInfo/DeliveryInfo';
import { ROUTES_DATA } from '~data/routes';
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
    title: CEO.DELIVERY.title,
    description: CEO.DELIVERY.description,
  };
}

function Page() {
  const catalogUrl = ROUTES_DATA.CATALOG.url;

  return (
    <div className={cn(styles.page, 'page-background--1')}>
      <div className={cn(styles['page__container'], 'decor-container')}>
        <div className={cn(styles['page__content-container'], styles['content-container'], 'decor-content-container')}>
          <h1 className={styles['content-container__title']}>Доставка</h1>

          <DeliveryInfo />

          <Button
            isLink
            rootClassName={cn(styles['content-container__btn'])}
            textClassName={cn(styles['content-container__btn-text'])}
            href={catalogUrl}
            text="Открыть каталог"
          />
        </div>
      </div>
    </div>
  );
}

export { Page };
