import cn from 'classnames';
import styles from './styles.module.scss';
import { IProps } from '.';
import { CartItem } from '~components/CartItem';
import { ErrorBlock } from '~components/ErrorBlock';
import { Loader } from '~components/Loader';
import { MessageBlock } from '~components/MessageBlock';

const CartProducts = ({
  rootClassName,
  cartProducts,
  cbChangeCountProduct,
  cbDeleteProduct,
  isLoadingCart,
  errorLoadingCart,
  cbRepeatCartRequest,
}: IProps) => {
  const cartItemsJSX = cartProducts.map((cartItem) => {
    return (
      <li key={cartItem.product.id} className={cn(styles['cart-products__item'])} data-testid="productItem">
        <CartItem
          rootClassName={cn(styles['cart-products__item'])}
          cartItem={cartItem}
          cbChangeCountProduct={cbChangeCountProduct}
          cbDeleteProduct={cbDeleteProduct}
        />
      </li>
    );
  });

  const renderLoader = isLoadingCart;
  const renderError = !isLoadingCart && errorLoadingCart;
  const renderEmptyMessage = !renderError && !isLoadingCart && !cartProducts.length;
  const renderList = !renderLoader && !renderError && !renderEmptyMessage;

  return (
    <div className={rootClassName} data-testid="cartProducts">
      {renderError && <ErrorBlock text="Произошла ошибка" cbRepeatRequest={cbRepeatCartRequest} />}

      {renderLoader && <Loader text="Перебираем корзину" />}

      {renderEmptyMessage && <MessageBlock text="Корзина пуста" />}

      {renderList && <ul className={cn(styles['cart-products'])}>{cartItemsJSX}</ul>}
    </div>
  );
};

export { CartProducts };
