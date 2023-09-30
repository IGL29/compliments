import cn from 'classnames';
import styles from './style.module.scss';
import { NewOrderContainer } from '~src/containers/NewOrderContainer/NewOrderContainer';
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
    title: CEO.ORDER.title,
    description: CEO.ORDER.description,
  };
}

const Page = () => {
  return (
    <div className={cn(styles['order-page'])}>
      <section className={cn(styles['order-page__order-section'], styles['order-section'])}>
        <div className={cn(styles['order-section__container'], 'site-container')}>
          <div className={cn('decor-border', styles['order-section__content-wrapper'])}>
            <h2 className={cn(styles['order-section__title'])}>Оформление заказа</h2>

            <NewOrderContainer />
          </div>
        </div>
      </section>
    </div>
  );
};

export { Page };
