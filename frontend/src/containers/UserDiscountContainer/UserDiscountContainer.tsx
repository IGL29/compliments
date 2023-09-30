import { UserDiscount } from '~src/components/UserDiscount';
import { useAppSelector } from '~src/hooks/useAppSelector';

const UserDiscountContainer = () => {
  const userDiscount = useAppSelector((state) => state.profile.userData?.discount);
  const userPurchaseAmount = useAppSelector((state) => state.profile.userData?.purchaseAmount);
  const isLoadingUser = useAppSelector((state) => state.profile.isProfileLoading);

  return <UserDiscount discount={userDiscount} purchaseAmount={userPurchaseAmount} isLoading={isLoadingUser} />;
};

export { UserDiscountContainer };
