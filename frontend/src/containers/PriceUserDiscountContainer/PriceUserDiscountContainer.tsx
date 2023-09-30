import { Price } from '~src/components/Price';
import { Props } from './types';
import { useAppSelector } from '~src/hooks/useAppSelector';

const PriceUserDiscountContainer = (props: Props) => {
  const userDiscount = useAppSelector((state) => state.profile.userData?.discount || 0);

  const mixedProps = { ...props, discount: props.discount ? props.discount + userDiscount : userDiscount };

  return <Price {...mixedProps} />;
};

export { PriceUserDiscountContainer };
