import styles from './style.module.scss';
import cn from 'classnames';
import { Image } from '~components/Image/Image';
import { IProps } from './types';
import { DateService } from '~src/services/DateService';

const PromoCard = ({ data }: IProps) => {
  const dateFrom = DateService.toFormat(data.date.from, { day: '2-digit', month: '2-digit' });
  const dateTo = DateService.toFormat(data.date.to, { day: '2-digit', month: '2-digit' });

  return (
    <div className={cn(styles['promo-card'])}>
      <div className={cn(styles['promo-card__img-wrapper'])}>
        <Image className={cn(styles['promo-card__img'])} src={data.image} alt={data.title} />
      </div>

      <p className={cn(styles['promo-card__date'])}>
        {dateFrom}-{dateTo}
      </p>

      <h2 className={cn(styles['promo-card__title'])}>{data.title}</h2>

      <p className={cn(styles['promo-card__descr'])}>{data.descr}</p>
    </div>
  );
};

export { PromoCard };
