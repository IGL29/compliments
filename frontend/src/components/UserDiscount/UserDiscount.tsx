import cn from 'classnames';

import styles from './style.module.scss';
import { IProps } from './types';

const UserDiscount = ({ discount = 0, purchaseAmount = 0, isLoading }: IProps) => {
  return (
    <div className={cn(styles['user-discount'])}>
      {isLoading && <p>Загрузка</p>}

      <section className={cn(styles['user-discount__section'])}>
        <h2 className={cn(styles['user-discount__section-title'])}>Сумма покупок</h2>
        <p className={cn(styles['user-discount__descr'])}>{purchaseAmount}₽</p>
      </section>

      <section className={cn(styles['user-discount__section'])}>
        <h2 className={cn(styles['user-discount__section-title'])}>Ваша постоянная скидка</h2>
        <p className={cn(styles['user-discount__descr'])}>{discount}%</p>
      </section>
    </div>
  );
};

export { UserDiscount };
