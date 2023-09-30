import cn from 'classnames';
import styles from './style.module.scss';
import { Slider, Slide, ButtonBack, ButtonNext, CarouselProvider } from 'pure-react-carousel';
import { ProductCard } from '~components/ProductCard/ProductCard';
import { Icon } from '../icons/Icon';
import { useViewportSize } from '~src/hooks/useViewportSize';
import { IProps } from './types';
import { Loader } from '../Loader';
import { ErrorBlock } from '../ErrorBlock';

const ProductsSlider = ({ rootClassName, cbAddToCart, products = [], isLoading, error, cbRepeatRequest, cbChangeProductCount }: IProps) => {
  const [viewportSizes] = useViewportSize();

  const countSlides =
    viewportSizes.width > 1420 ? 5 : viewportSizes.width > 998 ? 4 : viewportSizes.width > 576 ? 3 : 1;
  const isRenderSliderBtns = viewportSizes.width > 768;

  const totalSlides = products.length;

  const productsSlidesJSX = products.map((productItem, index) => {
    return (
      <Slide index={index} key={productItem.product.id} className={styles['products-slider__slide']}>
        <div className={styles['products-slider__slide-content-wrapper']}>
          <ProductCard productItem={productItem} isMini cbAddToCart={cbAddToCart} cbChangeProductCount={cbChangeProductCount} />
        </div>
      </Slide>
    );
  });

  return (
    <div className={cn(styles['carousel-root-wrapper'], rootClassName)}>
      {isLoading && (
        <div className={cn(styles['carousel-root-wrapper__loader-wrapper'], 'site-container')}>
          <Loader rootClassName={cn(styles['carousel-root-wrapper__loader'])} text="Смотрим чем заинтересовать..." />
        </div>
      )}

      {error && (
        <div className={cn(styles['carousel-root-wrapper__error-wrapper'])}>
          <ErrorBlock rootClassName={cn(styles['carousel-root-wrapper__error'])} cbRepeatRequest={cbRepeatRequest} />
        </div>
      )}

      {!isLoading && !error && (
        <CarouselProvider
          totalSlides={totalSlides}
          infinite={true}
          visibleSlides={countSlides}
          isIntrinsicHeight
          naturalSlideWidth={156}
          naturalSlideHeight={100}
          className={cn(styles['carousel'])}
        >
          <div className={cn(styles['carousel__wrapper-container'])}>
            <div className={cn(styles['wrapper-container__container'], 'site-container')}>
              <Slider className={styles['products-slider']}>{productsSlidesJSX}</Slider>
            </div>
          </div>

          {isRenderSliderBtns && (
            <>
              <ButtonBack className={cn(styles['carousel__btn'], styles['carousel__btn--back'])}>
                <Icon icon="arrow" />
              </ButtonBack>

              <ButtonNext className={cn(styles['carousel__btn'], styles['carousel__btn--next'])}>
                <Icon icon="arrow" />
              </ButtonNext>
            </>
          )}
        </CarouselProvider>
      )}
    </div>
  );
};

export { ProductsSlider };
