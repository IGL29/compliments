import { ROUTES_DATA } from '~src/data/routes';
import styles from './styles.module.scss';

const AddedToCartNotify = () => {
  return (
    <>
      Товар был добавлен в{' '}
      <a href={ROUTES_DATA.CART.url} className={styles['link']}>
        корзину
      </a>
    </>
  );
};

export { AddedToCartNotify };
