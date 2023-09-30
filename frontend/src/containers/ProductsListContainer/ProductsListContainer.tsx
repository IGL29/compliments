import { Props } from './types';
import { ProductsList } from '~src/components/ProductsList/ProductsList';
import { RootState } from '~src/store';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { requestProductsAsync } from '~src/store/features/products';
import { ICartItem } from '~src/services/api/entities/api-cart';
import { requestPostCartAsync } from '~src/store/features/cart';
import { usePageContext } from '~src/renderer/usePageContext';
import { IProductsParams } from '~src/services/api/entities/api-products/types';
import { ProductsService } from '~src/services/ProductsService/ProductsService';
import { AddedToCartNotify } from '~src/components/Notify/AddedToCartNotify';
import { ErrorNotify } from '~src/components/Notify/ErrorNotify';
import { NotificationsContext } from '~src/contexts/NotificationsContext';

const ProductsListContainer = (props: Props) => {
  const pageContext = usePageContext();
  const products = useAppSelector((store: RootState) => store.products.products);
  const isLoading = useAppSelector((store: RootState) => store.products.isLoading);
  const error = useAppSelector((store: RootState) => store.products.error);
  const notifications = useContext(NotificationsContext);

  const dispatch = useAppDispatch();

  const [productsWithCount, setProductsWithCount] = useState<ICartItem[]>([]);

  const changeProductCountHandler = (productItem: ICartItem) => {
    const changedProductIndex = productsWithCount.findIndex((productItemFromState) => productItemFromState.product.id === productItem.product.id);

    if (changedProductIndex === -1) {
      return null;
    }
    setProductsWithCount((prevProducts) => {
      prevProducts[changedProductIndex].count = productItem.count;
      return [...prevProducts];
    })
  }

  const addToCartHandler = (product: ICartItem) => {
    dispatch(requestPostCartAsync([product]))
      .unwrap()
      .then(() => {
        changeProductCountHandler({...product, count: 1});
        notifications.showNotify({
          content: <AddedToCartNotify />,
          status: 'message',
        });
      })
      .catch(() => {
        notifications.showNotify({
          content: <ErrorNotify />,
          status: 'error',
        });
      });
  };

  useEffect(() => {
    const updatedProducts: ICartItem[] = products.map((product) => ({count: 1, product}));
    setProductsWithCount(updatedProducts);
  }, [products])

  useEffect(() => {
    let params: IProductsParams = {};

    if (pageContext.urlParsed?.searchAll) {
      params = ProductsService.getParamsForProducts(pageContext.urlParsed?.searchAll);
    }
    dispatch(requestProductsAsync({ params }));
  }, [pageContext.urlParsed?.searchAll]);

  const repeatRequestHandler = () => dispatch(requestProductsAsync());

  return (
    <ProductsList
      rootClassName={props.rootClassName}
      products={productsWithCount}
      isLoading={isLoading}
      cbAddToCart={addToCartHandler}
      error={error}
      cbRepeatRequest={repeatRequestHandler}
      cbChangeProductCount={changeProductCountHandler}
    />
  );
};

export { ProductsListContainer };
