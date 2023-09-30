import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import cn from 'classnames';
import { Button } from '~components/Button';
import { Counter } from '~components/Counter/Counter';
import { DeliveryResolve, EContentVariant } from '~components/DeliveryResolve/DeliveryResolve';
import { Icon } from '~components/icons/Icon';
import { Image } from '~components/Image';
import styles from './styles.module.scss';
import { IProps, ResolvedDelivery } from './types';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PriceUserDiscountContainer } from '~src/containers/PriceUserDiscountContainer/PriceUserDiscountContainer';
import { ErrorBlock } from '../ErrorBlock';

const ProductDetails = ({
  rootClassName,
  product,
  isLoading,
  loadingError,
  productCount,
  cbChangeProductCount,
  cbAddToCart,
  cbRepeatRequest,
}: IProps) => {
  const [activePreviewImageUrl, setActivePreviewImageUrl] = useState('');

  const renderLoading = isLoading;
  const renderLoadingError = !renderLoading && loadingError;
  const renderProduct = !renderLoading && !renderLoadingError && product;

  let imagesProduct: string[] = [];

  if (renderProduct) {
    imagesProduct = [product.img.preview, ...product.img.other];
  }

  useEffect(() => {
    if (renderProduct) {
      setActivePreviewImageUrl(imagesProduct[0]);
    }
  }, [product]);

  let imageProductSlidesJSX: JSX.Element[] = [];
  let compositionItemsJSX: JSX.Element[] = [];
  let resolvedDelivery: ResolvedDelivery = EContentVariant.RESOLVED;

  if (renderProduct) {
    imageProductSlidesJSX = imagesProduct.map((image, index) => {
      return (
        <Slide index={0} className={cn(styles['slider__slide'], styles.slide)} key={product.id + index}>
          <button className={cn(styles['slide__btn'])} onClick={() => setActivePreviewImageUrl(image)}>
            <Image className={cn(styles['slide__img'])} alt={product.title} src={image} />
          </button>
        </Slide>
      );
    });

    compositionItemsJSX = product.compositionItems.map((item) => {
      return (
        <li className={cn(styles['set-list__item'])} key={item}>
          {item}
        </li>
      );
    });

    resolvedDelivery = product.isCanDelivered ? EContentVariant.RESOLVED : EContentVariant.UNRESOLVED;
  }

  return (
    <section className={cn(styles['page__product-description'], rootClassName)}>
      <div className={cn(styles['product-description__container'], 'site-container')}>
        {renderLoading && <Loader rootClassName={styles['product-description__loader']} text="Загрузка" />}

        {renderLoadingError && (
          <ErrorBlock
            rootClassName={styles['product-description__error']}
            text="Произошла ошибка"
            cbRepeatRequest={cbRepeatRequest}
          />
        )}

        {renderProduct && (
          <>
            <div
              className={cn(styles['product-description__product-images-wrapper'], styles['product-images-wrapper'])}
            >
              <div className={cn(styles['product-images-wrapper__carousel-wrapper'])}>
                <CarouselProvider
                  className={cn(styles.carousel)}
                  totalSlides={product.img.other.length}
                  infinite={true}
                  visibleSlides={4}
                  naturalSlideWidth={112}
                  naturalSlideHeight={155}
                  orientation="vertical"
                >
                  <Slider className={cn(styles.slider)} classNameTray={cn(styles['slider-tray'])}>
                    {imageProductSlidesJSX}
                  </Slider>
                </CarouselProvider>
              </div>

              <div className={cn(styles['product-images-wrapper__image-wrapper'])}>
                <Image
                  className={cn(styles['product-images-wrapper__image'])}
                  src={activePreviewImageUrl}
                  alt={product.title}
                />
              </div>
            </div>

            <div
              className={cn(styles['product-description__product-content-wrapper'], styles['product-content-wrapper'])}
            >
              <div
                className={cn(
                  styles['product-content-wrapper__product-content-section'],
                  styles['product-content-section'],
                )}
              >
                <h1 className={styles['product-content-section__title']}>{product.title}</h1>

                <p className={styles['product-content-section__product-number']}>арт. {product.itemNumber}</p>
              </div>

              <div
                className={cn(
                  styles['product-content-wrapper__product-content-section'],
                  styles['product-content-section'],
                )}
              >
                <p className={styles['product-content-section__subtitle']}>{product.composition}</p>

                <ul className={cn(styles['product-content-section__set-list'], styles['set-list'])}>
                  {compositionItemsJSX}
                </ul>
              </div>

              <div
                className={cn(
                  styles['product-content-wrapper__product-content-section'],
                  styles['product-content-section'],
                )}
              >
                <p className={cn(styles['product-content-section__subtitle'])}>Размер набора</p>

                <div className={cn(styles['product-content-section__sizes-descr'], styles['sizes-descr'])}>
                  <div className={cn(styles['sizes-descr__row'])}>
                    <p className={cn(styles['sizes-descr__head'])}>Габариты</p>
                    <p className={cn(styles['sizes-descr__body'])}>
                      {product.sizes.length} x {product.sizes.weight} x {product.sizes.height} x см
                    </p>
                  </div>

                  <div className={cn(styles['sizes-descr__row'])}>
                    <p className={cn(styles['sizes-descr__head'])}>Вес</p>
                    <p className={cn(styles['sizes-descr__body'])}>{product.sizes.weight} кг</p>
                  </div>
                </div>
              </div>

              <div
                className={cn(styles['product-content-wrapper__action-btns-wrapper'], styles['action-btns-wrapper'])}
              >
                <PriceUserDiscountContainer
                  rootClassName={cn(styles['action-btns-wrapper__price'])}
                  price={product.price}
                  discount={product.discount}
                />
                <Counter
                  rootClassName={cn(styles['action-btns-wrapper__counter'])}
                  value={productCount}
                  cbChangeValue={cbChangeProductCount}
                  min={1}
                  id="productCount"
                />
                <Button
                  rootClassName={cn(styles['action-btns-wrapper__button'])}
                  text="В корзину"
                  onClick={cbAddToCart}
                />
              </div>

              <DeliveryResolve
                rootClassName={cn(styles['product-content-wrapper__delivery-info'])}
                resolve={resolvedDelivery}
              />

              <div className={cn(styles['product-content-wrapper__social-wrapper'], styles['social-wrapper'])}>
                <p className={cn(styles['social-wrapper__text'])}>Поделиться:</p>

                <ul className={cn(styles['social-wrapper__list'])}>
                  <li className={cn(styles['social-wrapper__item'])}>
                    <a className={cn(styles['social-wrapper__link'])} href="." aria-label="Телеграм">
                      <Icon className={cn(styles['social-wrapper__icon'])} icon="telegram" viewBox="0 0 36 32" />
                    </a>
                  </li>

                  <li className={cn(styles['social-wrapper__item'])}>
                    <a className={cn(styles['social-wrapper__link'])} href="." aria-label="Вотсап">
                      <Icon className={cn(styles['social-wrapper__icon'])} icon="whatsapp" viewBox="0 0 31 32" />
                    </a>
                  </li>

                  <li className={cn(styles['social-wrapper__item'])}>
                    <a className={cn(styles['social-wrapper__link'])} href="." aria-label="Вконтакте">
                      <Icon className={cn(styles['social-wrapper__icon'])} icon="vk" viewBox="0 0 31 31" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export { ProductDetails };
