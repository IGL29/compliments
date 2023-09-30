import cn from 'classnames';
import styles from './style.module.scss';

const Payment = () => {
  return (
    <div className={cn(styles['payment'])}>
      <div className={cn('icon-bg--wallet-after', styles['payment__icon'])}></div>

      <div className={cn(styles['payment__descr-wrapper'], styles['descr-wrapper'])}>
        <p className={cn(styles['descr-wrapper__paragraph'])}>
          При курьерской доставке до адреса по Москве или при самовывозе вы можете оплатить заказ двумя способами:
        </p>

        <ul className={cn(styles['descr-wrapper__list'])}>
          <li className={cn(styles['descr-wrapper__item'])}>на сайте при оформлении заказа.</li>
          <li className={cn(styles['descr-wrapper__item'])}>при получении заказа (наличными или переводом).</li>
        </ul>

        <p className={cn(styles['descr-wrapper__paragraph'])}>При отправке посылки СДЭК 100% предоплата.</p>

        <p className={cn(styles['descr-wrapper__paragraph'])}>
          Оплатить заказ на сайте можно только после подтверждения заказа нашим менеджером. Вы делаете заказ, вам звонит
          наш менеджер, подтверждает наличие товара и высылает вам ссылку на оплату.
        </p>
      </div>
    </div>
  );
};
export { Payment };
