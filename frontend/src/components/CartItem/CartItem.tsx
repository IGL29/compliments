import cn from 'classnames';

import styles from './style.module.scss';
import { useViewportSize } from '~src/hooks/useViewportSize';
import { ROUTES_DATA } from '~src/data/routes';
import { Image } from '~components/Image/Image';
import { Button } from '~components/Button';
import { Counter } from '~components/Counter';
import { PriceUserDiscountContainer } from '~containers/PriceUserDiscountContainer';
import type { IProps } from './types';

const SHARED_BTN_PROPS = { rootClassName: styles['cart-item__btn'] };

const CartItem = ({
  rootClassName,
  cbChangeCountProduct,
  cbDeleteProduct,
  cartItem,
  isDescription = false,
}: IProps) => {
  const [viewportSizes] = useViewportSize();

  const btnProps =
    viewportSizes.width > 576
      ? ({ text: 'Убрать из корзины', variant: 2, ...SHARED_BTN_PROPS } as const)
      : ({
          iconViewBox: '-3 -3 23 23',
          variant: 1,
          icon: 'trash',
          ...SHARED_BTN_PROPS,
        } as const);

  const deleteHandler = () => cbDeleteProduct && cbDeleteProduct({ id: cartItem.product.id });
  const changeCountHandler = (count: number) => {
    cbChangeCountProduct && cbChangeCountProduct({ count: count, id: cartItem.product.id });
  };

  const productUrl = `${ROUTES_DATA.PRODUCT.url}/${cartItem.product.id}`;

  const titleJSX = <h2 className={cn(styles['descr-wrapper__title'])}>{cartItem.product.title}</h2>;
  const titleLinkJSX =
    'category' in cartItem.product ? (
      <a href={productUrl} className={styles['descr-wrapper__title']}>
        {titleJSX}
      </a>
    ) : (
      titleJSX
    );

  const imageJSX = (
    <Image className={cn(styles['cart-item__img'])} src={cartItem.product.img} alt={cartItem.product.title} />
  );
  const imageWrapperJSX =
    'category' in cartItem.product ? (
      <a className={cn(styles['cart-item__wrapper-img'])} href={productUrl} data-testid="imageLink">
        {imageJSX}
      </a>
    ) : (
      <div className={cn(styles['cart-item__wrapper-img'])}>{imageJSX}</div>
    );

  const contentClassName = isDescription ? styles['cart-item__content--col'] : '';

  return (
    <div className={cn(styles['cart-item'], rootClassName)} data-testid="cartItem">
      {imageWrapperJSX}

      <div className={cn(styles['cart-item__content'], contentClassName)}>
        <div className={cn(styles['cart-item__descr-wrapper'], styles['descr-wrapper'])}>
          {titleLinkJSX}

          <p className={styles['descr-wrapper__product-number']}>арт. {cartItem.product.itemNumber}</p>

          {isDescription && (
            <abbr title="Количество в штуках" data-testid="countDescription">
              Кол-во, (шт.):
            </abbr>
          )}

          <Counter
            rootClassName={styles['descr-wrapper__counter']}
            value={cartItem.count}
            cbChangeValue={changeCountHandler}
            min={1}
            delay={2000}
            isDisabled={isDescription}
            isHideButtons={isDescription}
          />

          <PriceUserDiscountContainer
            rootClassName={styles['descr-wrapper__price']}
            price={cartItem.product.price}
            discount={cartItem.product.discount}
          />
        </div>

        {!isDescription && <Button {...btnProps} ariaLabel="Удалить из корзины" onClick={deleteHandler} />}
      </div>
    </div>
  );
};

export { CartItem };
