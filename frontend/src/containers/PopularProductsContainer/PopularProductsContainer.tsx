import { ProductsSlider } from '~src/components/ProductsSlider/ProductsSlider';
import { Props } from '.';
import { RootState } from '~src/store';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { requestOfferProductsAsync } from '~src/store/features/offerProducts';
import { ICartItem } from '~src/services/api/entities/api-cart';
import { requestPostCartAsync } from '~src/store/features/cart';
import { AddedToCartNotify } from '~src/components/Notify/AddedToCartNotify';
import { NotificationsContext } from '~src/contexts/NotificationsContext';
import { ErrorNotify } from '~src/components/Notify/ErrorNotify';

const PopularProductsContainer = (props: Props) => {
  const offerProducts = useAppSelector((state: RootState) => state.offerProducts.products);
  const isLoading = useAppSelector((state: RootState) => state.offerProducts.isLoading);
  const error = useAppSelector((state) => state.offerProducts.error);
  const isLoadingPostCart = useAppSelector((state) => state.cart.isLoadingPostCart);

  const [offerProductsWithCount, setOfferProductsWithCount] = useState<ICartItem[]>([]);

  const dispatch = useAppDispatch();
  const notificationsValue = useContext(NotificationsContext);

  const requestProducts = () => dispatch(requestOfferProductsAsync({ count: 10 }));

  const changeProductCountHandler = (productItem: ICartItem) => {
    const changedProductIndex = offerProductsWithCount.findIndex((productItemFromState) => productItemFromState.product.id === productItem.product.id);

    if (changedProductIndex === -1) {
      return null;
    }
    setOfferProductsWithCount((prevProducts) => {
      prevProducts[changedProductIndex].count = productItem.count;
      return [...prevProducts];
    })
  }

  useEffect(() => {
    if (!offerProducts.length) {
      requestProducts();
    }
  }, []);

  useEffect(() => {
    const updatedProducts = offerProducts.map((product) => ({count: 1, product}))
    setOfferProductsWithCount(updatedProducts);
  }, [offerProducts])

  const addToCartHandler = (product: ICartItem) => {
    if (!isLoadingPostCart) {
      dispatch(requestPostCartAsync([product]))
        .unwrap()
        .then(() => {
          changeProductCountHandler({...product, count: 1});
          notificationsValue.showNotify({
            content: <AddedToCartNotify />,
            status: 'message',
          });
        })
        .catch(() => {
          notificationsValue.showNotify({
            content: <ErrorNotify />,
            status: 'error',
          });
        });
    }
  };

  return (
    <ProductsSlider
      {...props}
      products={offerProductsWithCount}
      isLoading={isLoading}
      cbAddToCart={addToCartHandler}
      cbRepeatRequest={requestProducts}
      cbChangeProductCount={changeProductCountHandler}
      error={error}
    />
  );
};

export { PopularProductsContainer };
