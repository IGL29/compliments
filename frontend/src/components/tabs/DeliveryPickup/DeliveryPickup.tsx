import styles from './style.module.scss';
import cn from 'classnames';

const DeliveryPickup = () => {
  return (
    <div className={cn(styles['pickup'])}>
      <div className={cn('icon-bg--car-after', styles['pickup__icon'])}></div>

      <div className={cn(styles['pickup__content-wrapper'], styles['content-wrapper'])}>
        <p className={cn(styles['content-wrapper__paragraph'])}>Самовывоз заказа осуществляется:</p>

        <ul className={cn(styles['content-wrapper__list'])}>
          <li className={cn(styles['content-wrapper__item'])}>с понедельника по субботу</li>
          <li className={cn(styles['content-wrapper__item'])}>с 10.00 до 19.00</li>
          <li className={cn(styles['content-wrapper__item'])}>по адресу: г.Москва, ул.Рождественская д.29</li>
        </ul>

        <p className={cn(styles['content-wrapper__paragraph'])}>
          <span className={cn(styles['accent-text'])}>ПО ПРЕДВАРИТЕЛЬНОМУ СОГЛАСОВАНИЮ</span> дня и времени самовывоза.
        </p>
      </div>
    </div>
  );
};

export { DeliveryPickup };
