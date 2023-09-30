import { useEffect } from 'react';
import { OrderDetail } from '~src/components/OrderDetail';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { usePageContext } from '~src/renderer/usePageContext';
import { IOrder } from '~src/services/api/entities/api-orders/types';
import { requestOrderAsync } from '~src/store/features/orders';

const OrderDetailContainer = () => {
  const dispatch = useAppDispatch();
  const pageContext = usePageContext();
  const errorLoadingOrder = useAppSelector((state) => state.order.errorLoadingOrder);
  const isLoadingOrder = useAppSelector((state) => state.order.isLoadingOrder);

  const requestOrder = (orderId: IOrder['id'] | null | undefined) => {
    if (!orderId) {
      return;
    }
    dispatch(requestOrderAsync(orderId));
  };

  useEffect(() => {
    if (pageContext.routeParams?.orderId) {
      requestOrder(pageContext.routeParams?.orderId);
    }
  }, [pageContext.routeParams?.orderId]);

  const order = useAppSelector((state) => state.order.order);

  return (
    <OrderDetail
      data={order}
      isLoading={isLoadingOrder}
      error={errorLoadingOrder}
      cbRepeatRequest={() => requestOrder(pageContext.routeParams?.orderId)}
    />
  );
};

export { OrderDetailContainer };
