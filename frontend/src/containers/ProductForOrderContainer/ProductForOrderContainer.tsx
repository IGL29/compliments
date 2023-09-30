import { ProductForOrder } from '~src/components/ProductForOrder';
import { Props } from './types';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { RootState } from '~src/store';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { requestProductAsync } from '~src/store/features/product';
import { usePageContext } from '~src/renderer/usePageContext';
import { requestPostCartAsync } from '~src/store/features/cart';
import { requestAdditionallyProductsAsync } from '~src/store/features/additionallyProducts';
import { IAdditionallyProduct } from '~src/services/api/entities/api-products/types';
import { NotificationsContext } from '~src/contexts/NotificationsContext';
import { AddedToCartNotify } from '~src/components/Notify/AddedToCartNotify';

const ProductForOrderContainer = (props: Props) => {
  const dispatch = useAppDispatch();
  const pageContext = usePageContext();
  const { showNotify } = useContext(NotificationsContext);

  const [selectedAdditionallyProducts, setSelectedAdditionallyProducts] = useState<IAdditionallyProduct[]>([]);
  const [productCount, setProductCount] = useState(1);

  const product = useAppSelector((state: RootState) => state.product.product);
  const additionallyProducts = useAppSelector((state: RootState) => state.additionallyProducts.products);
  const isProductLoading = useAppSelector((state: RootState) => state.product.isLoading);
  const isOfferProductsLoading = useAppSelector((state: RootState) => state.additionallyProducts.isLoading);
  const productsLoadingError = useAppSelector((state) => state.product.error);
  const additionallyLoadingError = useAppSelector((state) => state.additionallyProducts.error);

  useEffect(() => {
    if (product?.id !== pageContext?.routeParams?.productId) {
      requestProductHandler();
    }

    if (!additionallyProducts.length) {
      requestAdditionallyProductsHandler();
    }
  }, [pageContext?.routeParams?.productId]);

  const changeProductCountHandler = (count: number) => {
    setProductCount(count);
  };

  const requestProductHandler = () => {
    if (pageContext?.routeParams?.productId) {
      dispatch(requestProductAsync(pageContext.routeParams.productId));
    }
  };

  const requestAdditionallyProductsHandler = () => {
    dispatch(requestAdditionallyProductsAsync());
  };

  const addToCartHandler = () => {
    if (product) {
      const additionallyItemCart = selectedAdditionallyProducts.map((product) => ({
        count: 1,
        product,
      }));
      dispatch(requestPostCartAsync([{ count: productCount, product: {...product, img: product.img.preview} }, ...additionallyItemCart]))
        .unwrap()
        .then(() => {
          setSelectedAdditionallyProducts([]);
          setProductCount(1);
          showNotify({ content: <AddedToCartNotify />, status: 'message' });
        });
    }
  };

  const setSelectedHandler = (product: IAdditionallyProduct) => {
    const selectedProductIndex = selectedAdditionallyProducts.findIndex(
      (selectedProduct) => selectedProduct.id === product.id,
    );
    if (selectedProductIndex === -1) {
      setSelectedAdditionallyProducts([...selectedAdditionallyProducts, product]);
      return;
    }
    setSelectedAdditionallyProducts(selectedAdditionallyProducts.filter((_, index) => index !== selectedProductIndex));
  };

  return (
    <ProductForOrder
      {...props}
      product={product}
      additionallyProducts={additionallyProducts}
      isProductLoading={isProductLoading}
      productsLoadingError={productsLoadingError}
      additionallyLoadingError={additionallyLoadingError}
      isAdditionallyProductsLoading={isOfferProductsLoading}
      productCount={productCount}
      selectedAdditionallyProducts={selectedAdditionallyProducts}
      cbSetSelectedAdditionallyProducts={setSelectedHandler}
      cbChangeProductCount={changeProductCountHandler}
      cbAddToCart={addToCartHandler}
      cbRepeatRequestProduct={requestProductHandler}
      cbRepeatRequestAdditionally={requestAdditionallyProductsHandler}
    />
  );
};

export { ProductForOrderContainer };
