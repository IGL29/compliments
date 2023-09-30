import { CartProducts } from '~src/components/CartProducts';
import { Props } from './types';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { requestCartAsync, requestDeleteCartAsync, requestPatchCartAsync } from '~src/store/features/cart';
import { DeleteCartRequestPayload, PatchCartRequestPayload } from '~src/services/api/entities/api-cart';
import { NotificationsContext } from '~src/contexts/NotificationsContext';
import { useContext } from 'react';

const CartProductsContainer = (props: Props) => {
  const cart = useAppSelector((state) => state.cart.cart);
  const isLoadingCart = useAppSelector((state) => state.cart.isLoadingCart);
  const errorLoadingCart = useAppSelector((state) => state.cart.errorGet);
  const dispatch = useAppDispatch();
  const { showNotify } = useContext(NotificationsContext);

  const changeCountProductHandler = (payload: PatchCartRequestPayload) => {
    dispatch(requestPatchCartAsync(payload))
      .unwrap()
      .then(() => {
        showNotify({
          content: <>Количество товара успешно изменено</>,
          status: 'success',
        });
      })
      .catch(() => {
        showNotify({
          content: <>Ошибка при изменении кол-ва товара</>,
          status: 'error',
        });
      });
  };

  const deleteProductHandler = (payload: DeleteCartRequestPayload) => {
    dispatch(requestDeleteCartAsync(payload))
    .unwrap()
    .then(() => {
      showNotify({
        content: <>Товар успешно удален из корзины</>,
        status: 'success',
      });
    })
    .catch(() => {
      showNotify({
        content: <>Ошибка при удалении товара из корзины</>,
        status: 'error',
      });
    });
  };

  const repeatRequestCartHandler = () => dispatch(requestCartAsync());

  return (
    <CartProducts
      {...props}
      cartProducts={cart}
      errorLoadingCart={errorLoadingCart}
      isLoadingCart={isLoadingCart}
      cbChangeCountProduct={changeCountProductHandler}
      cbDeleteProduct={deleteProductHandler}
      cbRepeatCartRequest={repeatRequestCartHandler}
    />
  );
};

export { CartProductsContainer };
