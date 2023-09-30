import styles from './style.module.scss';
import cn from 'classnames';
import { PromoCard } from '~components/PromoCard';
import { IProps } from './types';
import { Loader } from '../Loader';
import { ErrorBlock } from '../ErrorBlock';

const PromoList = ({ rootClassName, promotions, isLoading, error, cbRepeatRequest }: IProps) => {
  const promoItemsJSX = promotions.map((promoItem) => {
    return (
      <li className={cn(styles['promo-list__promo-item'], 'reset-list')} key={promoItem.title}>
        <PromoCard data={promoItem} />
      </li>
    );
  });

  const renderLoader = isLoading;
  const renderError = !renderLoader && !!error;
  const renderList = !renderLoader && !renderError && !!promotions.length;

  return (
    <div className={cn(rootClassName, styles['promo-list-wrapper'])}>
      {renderLoader && <Loader rootClassName={styles['promo-list-wrapper__loader']} text="Загрузка" />}

      {renderError && (
        <ErrorBlock
          rootClassName={styles['promo-list-wrapper__error']}
          text="Произошла ошибка"
          cbRepeatRequest={cbRepeatRequest}
        />
      )}

      {renderList && <ul className={cn('reset-list', styles['promo-list'])}>{promoItemsJSX}</ul>}
    </div>
  );
};

export { PromoList };
