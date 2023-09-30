import cn from 'classnames';
import styles from './style.module.scss';
import { OrderDetailContainer } from '~src/containers/OrderDetailContainer';
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
    <div className={cn(styles['page'])}>
      <OrderDetailContainer />
    </div>
  );
};

export { Page };
