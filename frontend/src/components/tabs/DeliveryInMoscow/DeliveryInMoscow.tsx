import styles from './style.module.scss';
import cn from 'classnames';

const DeliveryInMoscow = () => {
  return (
    <div className={cn(styles['delivery-in-moscow'])}>
      <p className={cn(styles['delivery-in-moscow__paragraph'])}>
        Доставка по Москве осуществляется курьером компании (все виды подарочных наборов) или курьерской службой СДЭК
        (только наборы в коробках). После формирования заказа с вами связывается менеджер и согласовывает дату и время
        доставки.
      </p>

      <ul className={cn(styles['delivery-in-moscow__list'], 'reset-list')}>
        <li className={cn(styles['delivery-in-moscow__item'])}>
          <div className={cn('icon-bg--calendar-after', styles['delivery-in-moscow__icon'])}></div>
          <p className={cn(styles['delivery-in-moscow__item-descr'])}>
            Время изготовления заказа от 2х рабочих дней, в зависимости от сложности заказа.
          </p>
        </li>

        <li className={cn(styles['delivery-in-moscow__item'])}>
          <div className={cn('icon-bg--stopwatch-after', styles['delivery-in-moscow__icon'])}></div>
          <p className={cn(styles['delivery-in-moscow__item-descr'])}>Время доставки по Москве с 9.00 до 21.00.</p>
        </li>

        <li className={cn(styles['delivery-in-moscow__item'])}>
          <div className={cn('icon-bg--wallet-after', styles['delivery-in-moscow__icon'])}></div>
          <p className={cn(styles['delivery-in-moscow__item-descr'])}>
            Минимальной суммы заказа нет. Вы можете сделать заказ на любую сумму.
          </p>
        </li>
      </ul>

      <div className={cn(styles['delivery-in-moscow__descr'], styles['descr'])}>
        <div className={cn(styles['descr__row'], styles['row'])}>
          <p className={cn(styles['row__head'])}>В пределах МКАД</p>
          <div className={cn(styles['row__body'])}>
            <p className={cn(styles['row__paragraph'])}>до 5000₽ - 350 ₽</p>
            <p className={cn(styles['row__paragraph'])}>от 5000₽ - бесплатно</p>
          </div>
        </div>

        <div className={cn(styles['descr__row'], styles['row'])}>
          <p className={cn(styles['row__head'])}>до 5 км за МКАД</p>
          <div className={cn(styles['row__body'])}>
            <p className={cn(styles['row__paragraph'])}>до 5000₽ - 500 ₽</p>
            <p className={cn(styles['row__paragraph'])}>от 5000₽ до 6500₽ - 350 ₽</p>
            <p className={cn(styles['row__paragraph'])}>от 6500₽ - бесплатно</p>
          </div>
        </div>

        <div className={cn(styles['descr__row'], styles['row'])}>
          <p className={cn(styles['row__head'])}>5-10 км от МКАД</p>
          <div className={cn(styles['row__body'])}>
            <p className={cn(styles['row__paragraph'])}>до 5000₽ - 650 ₽</p>
            <p className={cn(styles['row__paragraph'])}>от 5000₽ до 6500₽ - 450 ₽</p>
            <p className={cn(styles['row__paragraph'])}>от 6500₽ до 8500₽ - 300 ₽</p>
            <p className={cn(styles['row__paragraph'])}>от 8500₽ - бесплатно</p>
          </div>
        </div>

        <div className={cn(styles['descr__row'], styles['row'])}>
          <p className={cn(styles['row__head'])}>свыше 10 км от МКАД</p>
          <div className={cn(styles['row__body'])}>
            Доставка на расстояние свыше 10км от МКАД осуществляется курьерской службой СДЭК до вашего адреса или до
            ближайшего пункта выдачи.
          </div>
        </div>
      </div>
    </div>
  );
};
export { DeliveryInMoscow };
