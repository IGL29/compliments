import { OrderInfo } from '~src/components/OrderInfo/OrderInfo';
import { Props } from './types';
import { useAppSelector } from '~src/hooks/useAppSelector';

const OrderInfoContainer = (props: Props) => {
  const cartAmountPrice = useAppSelector((state) => state.cart.amountPrice);
  const cartAmountDiscountPrice = useAppSelector((state) => state.cart.discountPrice);
  const cartAmountDiscountUserPrice = useAppSelector((state) => state.cart.discountWithUserPrice);

  return (
    <OrderInfo
      {...props}
      amountPrice={cartAmountPrice}
      discountPrice={cartAmountDiscountPrice}
      personalDiscountPrice={cartAmountDiscountUserPrice}
    />
  );
};

export { OrderInfoContainer };
