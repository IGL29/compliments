import cn from 'classnames';
import styles from './style.module.scss';
import { currencyFilter } from '~src/filters/currencyFilter';
import { IProps } from './types';

const Price = ({ price, discount, rootClassName }: IProps) => {
  const totalPrice = discount ? price - (discount / 100) * price : price;
  const priceValueClassName = discount ? styles['price-current--accent'] : '';

  return (
    <div className={cn(rootClassName, styles['price'])}>
      <p className={cn(styles['price__price-value'], styles['price-current'], priceValueClassName)}>
        {currencyFilter(totalPrice)}
      </p>

      {!!discount && <p className={cn(styles['price__price-value'], styles['price-old'])}>{price}</p>}
    </div>
  );
};

export { Price };
