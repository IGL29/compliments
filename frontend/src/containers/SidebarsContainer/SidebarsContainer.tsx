import { useEffect } from 'react';
import { Sidebars } from '~src/components/Sidebars/Sidebars';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { usePageContext } from '~src/renderer/usePageContext';
import { DOMSideEffectsService } from '~src/services/DOMSideEffectsService';
import { closeBurgerMenu } from '~src/store/features/sidebars/sidebarsSlice';

const SidebarsContainer = () => {
  const isOpenMenuBurger = useAppSelector((state) => state.sidebars.isOpenBurgerMenu);
  const dispatch = useAppDispatch();
  const pageContext = usePageContext();

  const closeBurgerMenuHandler = () => dispatch(closeBurgerMenu());
  
  useEffect(() => {
    closeBurgerMenuHandler();
  }, [pageContext.urlParsed])


  if (isOpenMenuBurger) {
    new DOMSideEffectsService().setOverflowBody();
  } else if (new DOMSideEffectsService().isOverflowBody()) {
    new DOMSideEffectsService().resetOverflowBody();
  }

  return <Sidebars cbCloseBurgerMenu={closeBurgerMenuHandler} isOpenBurgerMenu={isOpenMenuBurger} />;
};

export { SidebarsContainer };
