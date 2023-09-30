import { useContext } from 'react';
import { Banner } from '~src/components/Banner';
import { Props } from '.';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { openSubscribtionModal } from '~src/store/features/modals/modalsSlice';
import { requestPostSubscribeAsync } from '~src/store/features/profile';
import { NotificationsContext } from '~src/contexts/NotificationsContext';

const SubscribeBannerContainer = (props: Props) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.profile.isAuth);
  const { showNotify } = useContext(NotificationsContext);

  const doSubscribeHandler = () => {
    if (isAuth) {
      return dispatch(requestPostSubscribeAsync())
        .unwrap()
        .then(() => {
          showNotify({
            content: <>Вы успешно подписались на рассылку</>,
            status: 'success',
          });
        })
        .catch((error) => {
          showNotify({
            content: <>{error}</>,
            status: 'error',
          });
        });
    }
    dispatch(openSubscribtionModal());
  };

  return <Banner {...props} cbSubscribe={doSubscribeHandler} />;
};

export { SubscribeBannerContainer };
