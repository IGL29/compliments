import cn from 'classnames';
import styles from './style.module.scss';
import { IProps } from './types';
import { OrderItem } from '../OrderItem';

const OrdersList = ({ rootClassName, orders }: IProps) => {
  const ordersJSX = orders.map((order) => {
    const link = `/order/${order.id}`;

    return (
      <li className={cn(styles['orders__item'])} key={order.id}>
        <a className={cn(styles['orders__order-product-link'])} href={link}>
          <OrderItem order={order} />
        </a>
      </li>
    );
  });

  const emptyJSX = <p>Список заказов пуст</p>;
  const contentJSX = orders.length ? ordersJSX : emptyJSX;

  return <ul className={cn(rootClassName, 'reset-list', styles['orders'])}>{contentJSX}</ul>;
};

export { OrdersList };
