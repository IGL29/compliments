import cn from 'classnames';
import styles from './styles.module.scss';
import { usePageContext } from '~src/renderer/usePageContext';
import { ROUTES_DATA } from '~src/data/routes';
import { useViewportSize } from '~src/hooks/useViewportSize';
import { IProps } from './types';

const routesNav = Object.entries(ROUTES_DATA).filter(
  ([key, _]) =>
    key === 'MAIN' ||
    key === 'CATEGORIES' ||
    key === 'ABOUT_US' ||
    key === 'DELIVERY' ||
    key === 'PROMO' ||
    key === 'DISCOUNT' ||
    key === 'CONTACTS',
);

const NavList = ({ isBurger, rootClassName }: IProps) => {
  const pageContext = usePageContext();
  const [viewportSize] = useViewportSize();

  const navItemsJSX = routesNav.map(([key, value]) => {
    const activeLinkClassName =
      pageContext.urlPathname === value.url
        ? cn(styles['nav-item__link--active'], viewportSize.width > 992 ? '' : styles['nav-item__link--active-left'])
        : '';

    const linkClassName =
      'CATEGORIES' === key
        ? cn(styles['nav-item__link'], styles['nav-item__link--accent'], activeLinkClassName)
        : cn(styles['nav-item__link'], activeLinkClassName);

    return (
      <li className={cn(styles['nav-list__nav-item'], styles['nav-item'])} key={key}>
        <a className={linkClassName} href={value.url}>
          {value.name}
        </a>
      </li>
    );
  });

  const navListClassName = isBurger ? styles['nav-list--col'] : '';

  return (
    <nav className={cn(styles['nav'], rootClassName)}>
      <ul className={cn('reset-list', styles['nav-list'], navListClassName)}>{navItemsJSX}</ul>
    </nav>
  );
};

export { NavList };
