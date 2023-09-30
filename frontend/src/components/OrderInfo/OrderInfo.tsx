import cn from 'classnames';
import styles from './style.module.scss';
import { Price } from '../Price/Price';
import { IProps } from '.';

const OrderInfo = ({ rootClassName, discountPrice = 0, amountPrice = 0, personalDiscountPrice = 0 }: IProps) => {
  const totalPrice = amountPrice - (personalDiscountPrice || discountPrice);

  return (
    <div className={cn(styles['order-info'], rootClassName)}>
      <div className={cn(styles['order-info__row'])}>
        <p className={cn(styles['order-info__head'])}>Стоимость товаров:</p>
        <Price rootClassName={cn(styles['order-info__body'])} price={amountPrice} discount={0} />
      </div>

      <div className={cn(styles['order-info__row'])}>
        <p className={cn(styles['order-info__head'])}>Скидка на товары:</p>
        <Price rootClassName={cn(styles['order-info__body'])} price={discountPrice} discount={0} />
      </div>

      <div className={cn(styles['order-info__row'])}>
        <p className={cn(styles['order-info__head'])}>Скидка с учетом вашей:</p>
        <Price rootClassName={cn(styles['order-info__body'])} price={personalDiscountPrice} discount={0} />
      </div>

      <div className={cn(styles['order-info__row'])}>
        <p className={cn(styles['order-info__head'], styles['order-info__head--accent'])}>Предварительная стоимость:</p>

        <Price
          rootClassName={cn(styles['order-info__body'], styles['order-info__body--accent'])}
          price={totalPrice}
          discount={0}
        />
      </div>
    </div>
  );
};

export { OrderInfo };
