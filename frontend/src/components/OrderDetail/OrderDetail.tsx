import cn from 'classnames';
import styles from './style.module.scss';
import { IProps } from './types';
import { DateService } from '~src/services/DateService';
import { getStubString } from '~src/utils/getStubString';
import { TransformDataService } from '~src/services/TransformDataService';
import { Loader } from '../Loader';
import { ErrorBlock } from '../ErrorBlock';
import { OrderStatus } from '../OrderStatus';
import { CartItem } from '../CartItem';
import { DeliveryMethod } from '../DeliveryMethod';

const OrderDetail = ({ data, isLoading, error, cbRepeatRequest }: IProps) => {
  const orderDateView = data?.date
    ? DateService.toFormat(data.date, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : getStubString({ value: '', stub: '-' });
  const orderNumber = data?.number;
  const addressCity = getStubString({ value: data?.address?.city, stub: '-' });
  const addressApartment = getStubString({ value: data?.address?.apartment, stub: '-' });
  const addressEntrance = getStubString({ value: data?.address?.entrance, stub: '-' });
  const addressHouse = getStubString({ value: data?.address?.house, stub: '-' });
  const addressStreet = getStubString({ value: data?.address?.street, stub: '-' });
  const phone =
    data && data.phone ? TransformDataService.toViewPhone(data.phone) : getStubString({ value: '', stub: '-' });
  const deliveryMethod = data ? (
    <DeliveryMethod value={data.deliveryMethod} />
  ) : (
    getStubString({ value: '', stub: '-' })
  );

  const productItemsJSX = data?.cart.map((cartItem) => {
    if (data) {
      return <CartItem cartItem={cartItem} isDescription key={cartItem.product.id} />;
    }
    return <>Нет товаров</>;
  });

  const orderStatusJSX = data ? (
    <OrderStatus rootClassName={styles['order-product__status']} status={data.status} />
  ) : (
    getStubString({ value: '', stub: '-' })
  );

  const orderJSX = (
    <div className={cn(styles['order-detail__order'], styles['order'])}>
      <h1 className="visually-hidden">Информация о заказе</h1>

      <h2 className={cn(styles['order__number'], styles['number'])}>
        <span className={styles['number__descr']}>Номер заказа:</span>
        <span className={styles['number__value']}>{orderNumber}</span>
      </h2>

      <section className={cn(styles['order__address'], styles['address'], styles['frame'])}>
        <h3>Контактные данные</h3>

        <p className={styles['address__paragraph']}>
          <span className={styles['address__paragraph-descr']}>Город: </span>
          <span>{addressCity}</span>
        </p>
        <p className={styles['address__paragraph']}>
          <span className={styles['address__paragraph-descr']}>Квартира:</span>
          <span>{addressApartment}</span>
        </p>
        <p className={styles['address__paragraph']}>
          <span className={styles['address__paragraph-descr']}>Подъезд:</span>
          <span>{addressEntrance}</span>
        </p>
        <p className={styles['address__paragraph']}>
          <span className={styles['address__paragraph-descr']}> Дом:</span>
          <span>{addressHouse}</span>
        </p>
        <p className={styles['address__paragraph']}>
          <span className={styles['address__paragraph-descr']}>Улица:</span>
          <span>{addressStreet}</span>
        </p>
        <p className={styles['address__paragraph']}>
          <span className={styles['address__paragraph-descr']}>Телефон:</span>
          <span>{phone}</span>
        </p>
      </section>

      <section className={cn(styles['order__about-order'], styles['about-order'], styles['frame'])}>
        <h3 className={styles['about-order__title']}>О заказе</h3>

        <p className={styles['about-order__paragraph']}>Дата заказа: {orderDateView}</p>
        <p className={styles['about-order__paragraph']}>Способ получения: {deliveryMethod}</p>
        {orderStatusJSX}
      </section>

      <section className={cn(styles['products'])}>
        <h3 className={cn(styles['products__title'])}>Товары:</h3>

        <div className={styles['products__list']}>{productItemsJSX}</div>
      </section>
    </div>
  );

  const emptyJSX = <p>Заказ не найден</p>;

  const renderLoader = isLoading;
  const renderError = !isLoading && !!error;
  const renderContent = !renderLoader && !renderError && !!data;
  const renderEmpty = !renderLoader && !renderError && !renderContent;

  return (
    <div className={styles['order-detail']}>
      <div className={cn(styles['order-detail__container'], 'site-container')}>
        {renderLoader && <Loader text="Загружаем" />}

        {renderError && <ErrorBlock text="Произошла ошибка" cbRepeatRequest={cbRepeatRequest} />}

        {renderContent && orderJSX}

        {renderEmpty && emptyJSX}
      </div>
    </div>
  );
};

export { OrderDetail };
