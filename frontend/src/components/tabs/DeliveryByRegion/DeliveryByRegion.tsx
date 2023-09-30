import styles from './style.module.scss';
import cn from 'classnames';

const DeliveryByRegion = () => {
  return (
    <div className={cn(styles['delivery-by-region'])}>
      <ul className={cn(styles['delivery-by-region__list'], 'reset-list')}>
        <li className={cn(styles['delivery-by-region__item'])}>
          <div className={cn('icon-bg--car-after', styles['delivery-by-region__icon'])}></div>

          <div className={cn(styles['delivery-by-region__item-descr'], styles['item-descr'])}>
            <p className={cn(styles['item-descr__paragraph'], styles['item-descr__paragraph--accent'])}>Внимание!</p>
            <p className={cn(styles['item-descr__paragraph'])}>
              Доставка в МО и в регионы осуществляется курьерской службой СДЭК. Отправить СДЭКом можно только наборы в
              коробках.
            </p>
          </div>
        </li>

        <li className={cn(styles['delivery-by-region__item'])}>
          <div className={cn('icon-bg--calendar-after', styles['delivery-by-region__icon'])}></div>

          <div className={cn(styles['delivery-by-region__item-descr'], styles['item-descr'])}>
            <p className={cn(styles['item-descr__paragraph'])}>
              Срок доставки от 2х до 14 рабочих дней в зависимости от удалённости точки доставки. Отправка посылок
              осуществляется в течении 1-2х рабочих дней с момента оплаты.
            </p>
          </div>
        </li>

        <li className={cn(styles['delivery-by-region__item'])}>
          <div className={cn('icon-bg--wallet-after', styles['delivery-by-region__icon'])}></div>

          <div className={cn(styles['delivery-by-region__item-descr'], styles['item-descr'])}>
            <p className={cn(styles['item-descr__paragraph'])}>
              Стоимость доставки от 170р в зависимости от удалённости, веса заказа и размера посылки. Стоимость доставки
              рассчитывается автоматически при вводе адреса доставки. При отправке посылок всегда 100% предоплата за
              заказ и доставку.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export { DeliveryByRegion };
