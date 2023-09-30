import cn from 'classnames';
import { AdditionallyProductsList } from '../AdditionallyProductsList';
import { ProductDetails } from '../ProductDetails';
import styles from './styles.module.scss';
import { IProps } from './types';

const ProductForOrder = ({
  additionallySectionClassName,
  additionallyProducts,
  product,
  isProductLoading = false,
  isAdditionallyProductsLoading,
  productCount,
  selectedAdditionallyProducts,
  productsLoadingError,
  additionallyLoadingError,
  cbSetSelectedAdditionallyProducts,
  cbChangeProductCount,
  cbAddToCart,
  cbRepeatRequestProduct,
  cbRepeatRequestAdditionally,
}: IProps) => {
  return (
    <>
      <ProductDetails
        rootClassName={cn(styles['product-description'])}
        product={product}
        isLoading={isProductLoading}
        productCount={productCount}
        loadingError={productsLoadingError}
        cbChangeProductCount={cbChangeProductCount}
        cbAddToCart={cbAddToCart}
        cbRepeatRequest={cbRepeatRequestProduct}
      />

      <section className={cn(additionallySectionClassName, styles['additionally-section'])}>
        <div className={cn(styles['additionally-section__container'], 'site-container')}>
          <h2 className={cn(styles['additionally-section__title'])}>Добавить к заказу</h2>

          <AdditionallyProductsList
            isLoading={isAdditionallyProductsLoading}
            products={additionallyProducts}
            selectedProducts={selectedAdditionallyProducts}
            loadingError={additionallyLoadingError}
            cbSetSelectedProducts={cbSetSelectedAdditionallyProducts}
            cbRepeatRequest={cbRepeatRequestAdditionally}
          />
        </div>
      </section>
    </>
  );
};

export { ProductForOrder };
