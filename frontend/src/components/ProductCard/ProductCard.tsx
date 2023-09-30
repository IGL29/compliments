import cn from 'classnames';
import styles from './style.module.scss';
import { Button } from '~components/Button';
import { Counter } from '~components/Counter/Counter';
import { Image } from '~components/Image/Image';
import { IProps } from './types';
import { PriceUserDiscountContainer } from '~src/containers/PriceUserDiscountContainer/PriceUserDiscountContainer';

const ProductCard = ({ productItem, isMini = false, cbAddToCart, cbChangeProductCount }: IProps) => {
  const productUrl = `/product/${productItem.product.id}`;
  const counterId = `counter-${productItem.product.id}`;

  const imgWrapperClassName = isMini ? styles['img-wrapper--mini'] : '';
  const actionsBtnsWrapperClassName = isMini ? styles['action-btns-wrapper--mini'] : '';
  const counterClassName = isMini ? styles['action-btns-wrapper__counter--mini'] : '';
  const btnClassName = isMini ? styles['action-btns-wrapper__button-text--mini'] : '';
  const btnTextClassName = isMini ? styles['action-btns-wrapper__button-text--mini'] : '';

  const changeProductCountHandler = (count: number) => cbChangeProductCount({...productItem, count});
  const addToCartHandler = () => cbAddToCart(productItem);

  return (
    <div className={cn(styles.card)}>
      <div className={cn(styles['card__img-wrapper'], imgWrapperClassName, styles['img-wrapper'])}>
        <a className={cn(styles['img-wrapper__link'])} href={productUrl} aria-label={productItem.product.title}>
          <Image className={cn(styles['img-wrapper__img'])} src={productItem.product.img} alt={productItem.product.title} />
        </a>
      </div>

      <p className={cn(styles['card__product-number'])}>{productItem.product.itemNumber}</p>

      <a href={productUrl}>
        <h2 className={cn(styles['card__title'])}>{productItem.product.title}</h2>
      </a>

      <PriceUserDiscountContainer
        rootClassName={cn(styles['card__price'])}
        price={productItem.product.price}
        discount={productItem.product.discount}
      />

      <div
        className={cn(styles['card__action-btns-wrapper'], styles['action-btns-wrapper'], actionsBtnsWrapperClassName)}
      >
        <Counter
          rootClassName={cn(styles['action-btns-wrapper__counter'], counterClassName)}
          value={productItem.count}
          min={1}
          cbChangeValue={changeProductCountHandler}
          id={counterId}
        />

        <Button
          rootClassName={cn(styles['action-btns-wrapper__button'], btnClassName)}
          textClassName={btnTextClassName}
          text="В корзину"
          onClick={() => addToCartHandler()}
        />
      </div>
    </div>
  );
};

export { ProductCard };
