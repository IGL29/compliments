import { useViewportSize } from '~src/hooks/useViewportSize';
import { BurgerMenu } from '../BurgerMenu';
import { NavList } from '../NavList';
import { IProps } from './types';

const Sidebars = ({ isOpenBurgerMenu, cbCloseBurgerMenu }: IProps) => {
  const [viewportSize] = useViewportSize();

  const isRenderBurgerMenu = viewportSize.width <= 992 && isOpenBurgerMenu;

  return (
    <>
      {isOpenBurgerMenu && isRenderBurgerMenu && (
        <BurgerMenu cbBtnClose={() => cbCloseBurgerMenu()}>
          <NavList isBurger />
        </BurgerMenu>
      )}
    </>
  );
};

export { Sidebars };
