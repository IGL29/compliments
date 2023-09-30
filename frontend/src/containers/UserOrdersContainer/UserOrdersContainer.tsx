import { useEffect } from 'react';
import { UserOrders } from '~src/components/UserOrders';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { requestOrdersAsync } from '~src/store/features/orders';

const UserOrdersContainer = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.order.orders);
  const errorLoadingOrders = useAppSelector((state) => state.order.errorLoadingOrders);
  const isLoadingOrders = useAppSelector((state) => state.order.isLoadingOrders);
  const isAuth = useAppSelector((state) => state.profile.isAuth);

  const requestOrders = () => dispatch(requestOrdersAsync());

  useEffect(() => {
    if (isAuth) {
      requestOrders();
    }
  }, [isAuth]);

  return (
    <UserOrders
      orders={orders}
      isLoading={isLoadingOrders}
      error={errorLoadingOrders}
      cbRepeatRequestOrders={requestOrders}
    />
  );
};

export { UserOrdersContainer };
