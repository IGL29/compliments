import cn from 'classnames';
import type { IProps } from './types';
import styles from './style.module.scss';
import { Button } from '~components/Button';
import { AddressContainer } from '~containers/AddressContainer';
import { ROUTES_DATA } from '~src/data/routes';

const BurgerMenu = ({ children, cbBtnClose }: IProps) => {
  return (
    <div className={cn(styles['burger-menu'])} data-testid="burgerMenu">
      <div className={cn(styles['burger-menu__header'])}>
        <a
          className={cn(styles['burger-menu__logo-link'])}
          href={ROUTES_DATA.MAIN.url}
          aria-label="На главную"
          data-testid="linkOnMain"
        ></a>
        <Button rootClassName={cn(styles['burger-menu__btn-close'])} onClick={cbBtnClose}></Button>
      </div>

      <div className={cn(styles['burger-menu__body'])}>
        <div className={cn(styles['burger-menu__content'])}>{children}</div>

        <AddressContainer rootClassName={cn(styles['burger-menu__address'])} />
      </div>
    </div>
  );
};

export { BurgerMenu };
