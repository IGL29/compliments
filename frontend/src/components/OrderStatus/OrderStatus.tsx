import cn from 'classnames';
import styles from './style.module.scss';
import { IProps } from './types';

const STATUS_DESCR = {
  pending: 'Ожидает оплаты',
  paid: 'Опалчен',
  delivered: 'Доставлен',
};

const STATUS_CLASSNAME = {
  pending: styles['status__state--pending'],
  paid: styles['status__state--pending'],
  delivered: styles['status__state--pending'],
};

const OrderStatus = ({ rootClassName, status }: IProps) => {
  const statusView = STATUS_DESCR[status];
  const statusClassName = STATUS_CLASSNAME[status];

  return (
    <div className={cn(styles['status'], rootClassName)}>
      <span className={styles['status__descr']}>Статус: </span>
      <span className={cn(styles['status__state'], statusClassName)}>{statusView}</span>
    </div>
  );
};

export { OrderStatus };
