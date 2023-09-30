import cn from 'classnames';
import { ROUTES_DATA } from '../../data/routes/routes';
import styles from './style.module.scss';
import { Icon } from '~components/icons/Icon';

const footerRoutesData = Object.entries(ROUTES_DATA).filter(
  ([key, _]) =>
    !(
      key === 'MAIN' ||
      key === 'CATEGORIES' ||
      key === 'PROFILE' ||
      key === 'ORDER' ||
      key === 'ORDERS' ||
      key === 'CART' ||
      key === 'NEW_ORDER'
    ),
);

const Footer = () => {
  const routesJSX = footerRoutesData.map(([_, value]) => (
    <li key={value.url}>
      <a href={value.url}>{value.name}</a>
    </li>
  ));

  return (
    <footer className={cn(styles.footer)}>
      <div className={cn(styles['footer__container'], 'site-container')}>
        <a href="/" className={cn(styles['footer__logo-link'])} aria-label="На главную"></a>

        <a href="/" className={cn(styles['footer__policy'])}>
          Политика конфиденциальности
        </a>

        <p className={cn(styles['footer__copyright'])}>Copyright © 2023, комплименты</p>

        <ul className={cn(styles['footer__navigation-list'], 'reset-list')}>{routesJSX}</ul>

        <address className={cn(styles['footer__address'], styles['address'])}>
          <a className={cn(styles['address__phone'])} href="tel:79852234059">
            +7 (985) 223-40-59
          </a>

          <a className={cn(styles['address__email'])} href="mailto:info@complimente.ru">
            info@complimente.ru
          </a>

          <p className={cn(styles['address__worktime'])}>с 9:00 до 19:00 (Пн-Сб)</p>

          <div className={cn(styles['address__social-wrapper'], styles['social-wrapper'])}>
            <a
              className={cn(styles['social-wrapper__link'], styles['social-wrapper__link--telegram'])}
              aria-label="Телеграм"
              href="/"
            >
              <Icon icon="telegram" className={styles['social-wrapper__icon--telegram']} />
            </a>

            <a
              className={cn(styles['social-wrapper__link'], styles['social-wrapper__link--whatsapp'])}
              href="/"
              aria-label="Вотсап"
            >
              <Icon icon="whatsapp" className={styles['social-wrapper__icon--whatsapp']} />
            </a>
          </div>
        </address>
      </div>
    </footer>
  );
};

export { Footer };
