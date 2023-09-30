import { useEffect } from 'react';
import { PromoList } from '~src/components/PromoList';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { requestPromotionsAsync } from '~src/store/features/promo';
import { Props } from './types';

const PromotionsContainer = (props: Props) => {
  const dispatch = useAppDispatch();
  const promotions = useAppSelector((state) => state.promo.promotions);
  const isLoading = useAppSelector((state) => state.promo.isLoading);
  const error = useAppSelector((state) => state.promo.error);

  const requestPromotionsHandler = () => dispatch(requestPromotionsAsync());

  useEffect(() => {
    if (promotions.length) {
      return;
    }
    requestPromotionsHandler();
  }, []);

  return (
    <PromoList
      {...props}
      promotions={promotions}
      isLoading={isLoading}
      error={error}
      cbRepeatRequest={requestPromotionsHandler}
    />
  );
};

export { PromotionsContainer };
