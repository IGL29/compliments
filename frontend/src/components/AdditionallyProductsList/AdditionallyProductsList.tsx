import cn from 'classnames';

import { Checkbox } from '~components/Checkbox';
import { Image } from '~components/Image';
import styles from './styles.module.scss';
import { IProps } from './types';
import type { IAdditionallyProduct } from '~src/services/api/entities/api-products/types';
import { PriceUserDiscountContainer } from '~containers/PriceUserDiscountContainer';
import { Loader } from '~components/Loader';
import { ErrorBlock } from '~components/ErrorBlock';

const AdditionallyProductsList = ({
  products,
  selectedProducts,
  cbSetSelectedProducts,
  loadingError,
  isLoading,
  cbRepeatRequest,
}: IProps) => {
  const isCheckedProduct = (productId: IAdditionallyProduct['id']) => {
    return selectedProducts.some((product) => product.id === productId);
  };

  const changeCheckedHandler = (product: IAdditionallyProduct) => {
    cbSetSelectedProducts(product);
  };

  const renderLoader = isLoading;
  const renderError = loadingError && !renderLoader;
  const renderList = !renderError && !renderLoader;

  const productsJSX = products.map((product) => {
    return (
      <li className={cn(styles['additionally-list__item'])} key={product.id} data-testid="productItem">
        <Checkbox
          rootClassName={cn(styles['additionally-list__checkbox'])}
          checkboxWrapperClassName={cn(styles['additionally-list__checkbox-input-wrapper'])}
          checkboxPosition="center"
          isChecked={isCheckedProduct(product.id)}
          cbChangeChecked={() => changeCheckedHandler(product)}
          inputId={product.id}
        >
          <div className={cn(styles['additionally-product'])}>
            <div className={cn(styles['additionally-product__img-wrapper'])}>
              <Image className={cn(styles['additionally-product__img'])} src={product.img} alt={product.title} />
            </div>

            <div className={cn(styles['additionally-product__content-wrapper'])}>
              <h3 className={cn(styles['additionally-product__title'])}>{product.title}</h3>
              <PriceUserDiscountContainer
                rootClassName={cn(styles['additionally-product__price'])}
                price={product.price}
                discount={product.discount}
              />
            </div>
          </div>
        </Checkbox>
      </li>
    );
  });

  return (
    <div data-testid="additionallyProductsist">
      {renderLoader && <Loader text="Загрузка" />}

      {renderError && <ErrorBlock text="Произошла ошибка" cbRepeatRequest={cbRepeatRequest} />}

      {renderList && (
        <ul className={cn(styles['additionally-section__additionally-list'], styles['additionally-list'])}>
          {productsJSX}
        </ul>
      )}
    </div>
  );
};

export { AdditionallyProductsList };
