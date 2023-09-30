import { Header } from '~src/components/Header';
import { Props } from './types';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { openBurgerMenu } from '~src/store/features/sidebars/sidebarsSlice';
import { openUserAuthModal } from '~src/store/features/modals/modalsSlice';
import { useEffect } from 'react';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { requestProfileAsync, saveTokenFromLocalAsync } from '~src/store/features/profile';
import { requestCartAsync } from '~src/store/features/cart';

const HeaderContainer = ({ rootClassName }: Props) => {
  const dispatch = useAppDispatch();

  const openBurgerMenuHandler = () => dispatch(openBurgerMenu());
  const openAuthModalHandler = () => dispatch(openUserAuthModal());

  const userName = useAppSelector((state) => state.profile.userData?.name);
  const cartCount = useAppSelector((state) => state.cart.countProducts);

  useEffect(() => {
    const requests = async () => {
      await dispatch(saveTokenFromLocalAsync());
      try {
        await dispatch(requestProfileAsync()).unwrap();
        await dispatch(requestCartAsync()).unwrap();
      } catch {
        dispatch(requestCartAsync());
      }
    }
    requests();
  }, []);

  return (
    <Header
      cartCount={cartCount}
      userName={userName}
      rootClassName={rootClassName}
      cbOpenBurgerMenu={openBurgerMenuHandler}
      cbOpenAuthModal={openAuthModalHandler}
    />
  );
};

export { HeaderContainer };
