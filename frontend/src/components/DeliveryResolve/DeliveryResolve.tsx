import cn from 'classnames';
import styles from './style.module.scss';
import { Tooltip } from '../Tooltip';

export enum EContentVariant {
  RESOLVED = 'resolved',
  UNRESOLVED = 'unresolved',
  PARTIAL = 'partial',
}

const descrJSX = (
  <p>
    Для нас важно чтобы вы получили красивый подарок, как на фото, поэтому для сохранения целостности отправить СДЭКОМ
    можно только товары из категории «В коробках»
  </p>
);

const CONTENT = {
  [EContentVariant.RESOLVED]: {
    titleJSX: <p className={cn(styles['delivery-info__text'])}>Товар можно отправить СДЭКом</p>,
    descrJSX,
  },
  [EContentVariant.UNRESOLVED]: {
    titleJSX: (
      <p className={cn(styles['delivery-info__text'])}>
        Товар <span className={cn(styles['delivery-info__text--accent'])}>не</span> может быть отправлен СДЭКом
      </p>
    ),
    descrJSX,
  },
  [EContentVariant.PARTIAL]: {
    titleJSX: <p className={cn(styles['delivery-info__text'])}>Некоторые товары из корзины нельзя отправить СДЭКом</p>,
    descrJSX,
  },
};

type ResolveVariant = `${EContentVariant}`;

const DeliveryResolve = ({
  rootClassName,
  resolve = 'resolved',
}: {
  rootClassName: string;
  resolve: ResolveVariant;
}) => {
  return (
    <div className={cn(styles['delivery-info'], rootClassName)}>
      <div className={cn(styles['delivery-info__icon'], styles['delivery-info'], 'icon-bg--car-after')}></div>

      {CONTENT[resolve].titleJSX}

      <Tooltip
        contentClassName={styles['delivery-info__tooltip-content']}
        verticalPosition="top"
        horizontalPosition="left"
        id="deliveryTooltip"
      >
        <div className={cn(styles['delivery-info__info-icon'], styles['info-icon'])}>
          <p className={cn(styles['info-icon__text'])}>i</p>
        </div>

        {CONTENT[resolve].descrJSX}
      </Tooltip>
    </div>
  );
};

export { DeliveryResolve };
