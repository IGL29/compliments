import cn from 'classnames';
import styles from './style.module.scss';
import { Button } from '~components/Button';
import { usePageContext } from '~src/renderer/usePageContext';
import { UserDataContainer } from '~src/containers/UserDataContainer';
import { UserOrdersContainer } from '~src/containers/UserOrdersContainer';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useEffect } from 'react';
import { UserDiscountContainer } from '~src/containers/UserDiscountContainer';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { requestProfileAsync } from '~src/store/features/profile/sideEffects';
import { CEO } from '~src/data/CEO';

export { getDocumentProps };

function getDocumentProps() {
  return {
    title: CEO.PROFILE.title,
    description: CEO.PROFILE.description,
  };
}

enum EButtonActiveVariant {
  INACTIVE = 2,
  ACTIVE = 3,
}

enum ERouteParams {
  USER_DATA = 'root',
  USER_DISCOUNT = 'discount',
  USER_ORDERS = 'orders',
}

const Page = () => {
  const pageContext = usePageContext();
  const isAuth = useAppSelector((state) => state.profile.isAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(requestProfileAsync());
    }
  }, [isAuth]);

  const viewJSX =
    pageContext.routeParams?.view === ERouteParams.USER_DATA ? (
      <UserDataContainer rootClassName={styles['page__content']} />
    ) : pageContext.routeParams?.view === ERouteParams.USER_DISCOUNT ? (
      <UserDiscountContainer />
    ) : pageContext.routeParams?.view === ERouteParams.USER_ORDERS ? (
      <UserOrdersContainer />
    ) : (
      <UserDataContainer rootClassName={styles['page__content']} />
    );

  const getButtonVariant = (param: `${ERouteParams}`) => {
    return pageContext.routeParams?.view === param ? EButtonActiveVariant.ACTIVE : EButtonActiveVariant.INACTIVE;
  };

  return (
    <div className={cn(styles.page, 'page-background--1')}>
      <div className={cn(styles['page__container'], 'decor-container')}>
        <div className={cn(styles['page__content-container'], styles['content-container'], 'decor-content-container')}>
          <h1 className={cn(styles['page__title'], 'site-title')}>Личный кабинет</h1>

          <div className={cn(styles['page__nav-wrapper'])}>
            <Button
              rootClassName={cn(styles['page__nav-link'])}
              wrapperContentClassName={cn(styles['page__wrapper-text-link'])}
              textClassName={cn(styles['page__text-nav-link'])}
              isLink
              href="/profile"
              text="Мои данные"
              variant={getButtonVariant('root')}
            />

            <Button
              rootClassName={cn(styles['page__nav-link'])}
              wrapperContentClassName={cn(styles['page__wrapper-text-link'])}
              textClassName={cn(styles['page__text-nav-link'])}
              isLink
              href="/profile/discount"
              text="Личная скидка"
              variant={getButtonVariant('discount')}
            />

            <Button
              rootClassName={cn(styles['page__nav-link'])}
              wrapperContentClassName={cn(styles['page__wrapper-text-link'])}
              textClassName={cn(styles['page__text-nav-link'])}
              isLink
              href="/profile/orders"
              text="Мои покупки"
              variant={getButtonVariant('orders')}
            />
          </div>

          {viewJSX}
        </div>
      </div>
    </div>
  );
};

export { Page };
