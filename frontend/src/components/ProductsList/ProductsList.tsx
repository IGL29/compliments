import cn from 'classnames';
import { ProductCard } from '../ProductCard';
import styles from './styles.module.scss';
import { IProps } from './types';
import { Loader } from '../Loader';
import { ErrorBlock } from '../ErrorBlock';
import { MessageBlock } from '../MessageBlock';

const ProductsList = (props: IProps) => {
  const productsJSX = props.products.map((productItem) => {
    return (
      <li className={cn(styles['products-list__product-item'])} key={productItem.product.id}>
        <ProductCard
          key={productItem.product.id}
          productItem={productItem}
          {...props}
          cbAddToCart={props.cbAddToCart}
          cbChangeProductCount={props.cbChangeProductCount}
        />
      </li>
    );
  });

  const renderLoader = props.isLoading;
  const renderError = !!props.error;
  const renderEmptyMessage = !props.isLoading && !props.error && !props.products.length;
  const renderList = !props.isLoading && !props.error && !!props.products.length;

  return (
    <div className={cn(props.rootClassName, styles['wrapper-products-list'])}>
      {renderLoader && <Loader rootClassName={styles['wrapper-products-list__loader']} text="Загрузка" />}

      {renderError && (
        <ErrorBlock
          rootClassName={styles['wrapper-products-list__loader']}
          text="Произошла ошибка"
          cbRepeatRequest={props.cbRepeatRequest}
        />
      )}
      {renderEmptyMessage && <MessageBlock text="Не найдены товары соответствующие фильтрам" />}

      {renderList && (
        <ul className={cn(props.productsListClassName, styles['products-list'], 'reset-list')}>{productsJSX}</ul>
      )}
    </div>
  );
};

export { ProductsList };
