import cn from 'classnames';
import styles from './style.module.scss';
import { Button } from '~src/components/Button';
import { ROUTES_DATA } from '~src/data/routes';
import { CartProductsContainer } from '~src/containers/CartProductsContainer/CartProductsContainer';
import { OrderInfoContainer } from '~src/containers/OrderInfoContainer';
import { useAppSelector } from '~src/hooks/useAppSelector';
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
    title: CEO.CART.title,
    description: CEO.CART.description,
  };
}

const Page = () => {
  const countCartProducts = useAppSelector((state) => state.cart.cart.length);

  const isRenderButtonDoOrder = !!countCartProducts;

  return (
    <div className={cn(styles['cart'])}>
      <div className={cn(styles['cart__container'], 'site-container')}>
        <h1 className={cn(styles['cart__title'], 'site-title')}>Корзина</h1>

        <div className={cn(styles['cart__content-container'], styles['content-container'])}>
          <section
            className={cn(styles['content-container__products-section'], styles['products-section'], 'decor-border')}
          >
            <h2 className="visually-hidden">Продукты в корзине</h2>

            <CartProductsContainer rootClassName={styles['products-section__cart-products']} />
          </section>

          <section className={cn(styles['content-container__descr-section'], styles['descr-section'], 'decor-border')}>
            <h2 className={cn(styles['descr-section__title'], 'visually-hidden')}>Информация о заказе</h2>

            <OrderInfoContainer rootClassName={cn(styles['descr-section__order-info'])} />

            {isRenderButtonDoOrder && (
              <Button
                rootClassName={cn(styles['descr-section__btn'])}
                textClassName={cn(styles['descr-section__btn-text'])}
                text="К оформлению заказа"
                isLink
                href={ROUTES_DATA.NEW_ORDER.url}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export { Page };
