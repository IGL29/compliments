import cn from 'classnames';
import { Price } from '~components/Price';
import { IProps } from './types';
import styles from './style.module.scss';
import { OrderStatus } from '../OrderStatus';
import { DateService } from '~src/services/DateService';

const OrderItem = ({ rootClassName, order }: IProps) => {
  const amountOrder = order.cart.reduce((accum, cartItem) => accum + cartItem.count * cartItem.product.price, 0);
  const orderDateView = DateService.toFormat(order.date, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const countOrders = order.cart.reduce((accum, cartItem) => cartItem.count + accum, 0);

  return (
    <div className={cn(styles['order-product'], rootClassName)}>
      <div className={styles['order-product__background-img']}></div>

      <div className={cn(styles['order-product__content-wrapper'], styles['content-wrapper'])}>
        <h3 className={styles['content-wrapper__title']}>Заказ № {order.number}</h3>

        <p className={styles['content-wrapper__paragraph']}>{orderDateView}</p>

        <p className={styles['content-wrapper__paragraph']}>Товаров в заказе: {countOrders}</p>

        <div className={cn(styles['content-wrapper__price-wrapper'], styles['price-wrapper'])}>
          <p className={cn(styles['content-wrapper__price-wrapper'], styles['price-wrapper__text'])}>Сумма заказа:</p>
          <Price rootClassName={cn(styles['price-wrapper__price'])} price={amountOrder} discount={0} />
        </div>
      </div>

      <OrderStatus rootClassName={styles['order-product__status']} status={order.status} />
    </div>
  );
};

export { OrderItem };
