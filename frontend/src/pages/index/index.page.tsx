import cn from 'classnames';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { PopularProductsContainer } from '~src/containers/PopularProductsContainer/PopularProductsContainer';
import { SubscribeBannerContainer } from '~src/containers/SubscribeBannerContainer/SubscribeBannerContainer';
import { Button } from '~components/Button';
import { Icon } from '~components/icons/Icon';
import { CatalogLink } from '~components/CatalogLink/CatalogLink';
import { DeliveryInfo } from '~components/DeliveryInfo/DeliveryInfo';
import { useViewportSize } from '~hooks/useViewportSize';
import styles from './style.module.scss';
import { ROUTES_DATA } from '~src/data/routes';
import { CEO } from '~src/data/CEO';
import { StoreService } from '~src/services/StoreService/StoreService';
import { requestShopContacts } from '~src/store/features/shopContacts';

export { onBeforeRender };

async function onBeforeRender() {
  const store = new StoreService().store;

  if (!store.getState().shopContacts.data) {
    await store.dispatch(requestShopContacts());
  }

  return {
    pageContext: {
      PRELOADED_STATE: store.getState(),
    },
  };
}

export { getDocumentProps };

function getDocumentProps() {
  return {
    title: CEO.MAIN.title,
    description: CEO.MAIN.description,
  };
}

function Page() {
  const [viewportSizes] = useViewportSize();

  const catalogUrl = ROUTES_DATA.CATALOG.url;
  const sliderInterval = 8000;
  const isPlayingSlider = true;

  return (
    <div>
      <div className={cn(styles['hero'])}>
        <div className={cn(styles['hero__container'])}>
          <CarouselProvider
            totalSlides={4}
            infinite={true}
            visibleSlides={1}
            naturalSlideWidth={viewportSizes.width <= 768 ? 320 : 1680}
            naturalSlideHeight={viewportSizes.width <= 768 ? 340 : 730}
            className={cn(styles['hero__carousel'])}
            isPlaying={isPlayingSlider}
            interval={sliderInterval}
          >
            <div className={cn(styles['hero__slider-outer-wrapper'])}>
              <div className={cn(styles['hero__slider-wrapper'], 'site-container')}>
                <Slider className={cn(styles['hero__slider'])}>
                  <Slide index={0}>
                    <div
                      className={cn(
                        styles['hero__slide-content'],
                        styles['slide-content'],
                        styles['slide-background--1'],
                      )}
                    >
                      <div className={cn(styles['slide-content__bg-mini'], styles['slide-background--1'])} />
                      <div
                        className={cn(styles['slide-content__inner-content-wrapper'], styles['inner-content-wrapper'])}
                      >
                        <p className={cn(styles['inner-content-wrapper__title'])}>
                          Оригинальные подарки с&#160;идеальным стилем
                        </p>
                        <p className={cn(styles['inner-content-wrapper__text'])}>
                          Атмосферные подарочные наборы на любой случай{' '}
                        </p>
                        <Button
                          rootClassName={cn(styles['inner-content-wrapper__link'])}
                          textClassName={cn(styles['inner-content-wrapper__link-text'])}
                          text="Смотреть в каталоге"
                          isLink
                          href={catalogUrl}
                        />
                      </div>
                    </div>
                  </Slide>

                  <Slide index={1}>
                    <div
                      className={cn(
                        styles['hero__slide-content'],
                        styles['slide-content'],
                        styles['slide-background--1'],
                      )}
                    >
                      <div className={cn(styles['slide-content__bg-mini'], styles['slide-background--1'])} />
                      <div
                        className={cn(styles['slide-content__inner-content-wrapper'], styles['inner-content-wrapper'])}
                      >
                        <p className={cn(styles['inner-content-wrapper__title'])}>
                          Оригинальные подарки с&#160;идеальным стилем
                        </p>
                        <p className={cn(styles['inner-content-wrapper__text'])}>
                          Атмосферные подарочные наборы на любой случай{' '}
                        </p>
                        <Button
                          rootClassName={cn(styles['inner-content-wrapper__link'])}
                          textClassName={cn(styles['inner-content-wrapper__link-text'])}
                          text="Смотреть в каталоге"
                          isLink
                          href={catalogUrl}
                        />
                      </div>
                    </div>
                  </Slide>

                  <Slide index={2}>
                    <div
                      className={cn(
                        styles['hero__slide-content'],
                        styles['slide-content'],
                        styles['slide-background--1'],
                      )}
                    >
                      <div className={cn(styles['slide-content__bg-mini'], styles['slide-background--1'])} />
                      <div
                        className={cn(styles['slide-content__inner-content-wrapper'], styles['inner-content-wrapper'])}
                      >
                        <p className={cn(styles['inner-content-wrapper__title'])}>
                          Оригинальные подарки с&#160;идеальным стилем
                        </p>
                        <p className={cn(styles['inner-content-wrapper__text'])}>
                          Атмосферные подарочные наборы на любой случай{' '}
                        </p>
                        <Button
                          rootClassName={cn(styles['inner-content-wrapper__link'])}
                          textClassName={cn(styles['inner-content-wrapper__link-text'])}
                          text="Смотреть в каталоге"
                          isLink
                          href="/catalog"
                        />
                      </div>
                    </div>
                  </Slide>

                  <Slide index={3}>
                    <div
                      className={cn(
                        styles['hero__slide-content'],
                        styles['slide-content'],
                        styles['slide-background--1'],
                      )}
                    >
                      <div className={cn(styles['slide-content__bg-mini'], styles['slide-background--1'])} />
                      <div
                        className={cn(styles['slide-content__inner-content-wrapper'], styles['inner-content-wrapper'])}
                      >
                        <p className={cn(styles['inner-content-wrapper__title'])}>
                          Оригинальные подарки с&#160;идеальным стилем
                        </p>
                        <p className={cn(styles['inner-content-wrapper__text'])}>
                          Атмосферные подарочные наборы на любой случай{' '}
                        </p>
                        <Button
                          rootClassName={cn(styles['inner-content-wrapper__link'])}
                          textClassName={cn(styles['inner-content-wrapper__link-text'])}
                          text="Смотреть в каталоге"
                          isLink
                          href="/catalog"
                        />
                      </div>
                    </div>
                  </Slide>
                </Slider>
              </div>

              <ButtonBack
                className={cn(styles['carousel__btn'], styles['hero-carousel-btn'], styles['carousel__btn--back'])}
              >
                <Icon icon="arrow" />
              </ButtonBack>

              <ButtonNext
                className={cn(styles['carousel__btn'], styles['hero-carousel-btn'], styles['carousel__btn--next'])}
              >
                <Icon icon="arrow" />
              </ButtonNext>
            </div>

            <div className={cn(styles['hero__dot-group'])}>
              <Dot slide={0} className={cn(styles['hero__dot'])} />
              <Dot slide={1} className={cn(styles['hero__dot'])} />
              <Dot slide={2} className={cn(styles['hero__dot'])} />
              <Dot slide={3} className={cn(styles['hero__dot'])} />
            </div>
          </CarouselProvider>
        </div>
      </div>

      <div className={cn(styles['category-links'])}>
        <div className="site-container">
          <div className={cn(styles['category-links__wrapper-links'])}>
            <CatalogLink category="Holiday" isAnimate toCatalog />
            <CatalogLink category="He" isAnimate toCatalog />
            <CatalogLink category="She" isAnimate toCatalog />
            <CatalogLink category="Corporate" isAnimate toCatalog />
          </div>
        </div>
      </div>

      <section className={styles['advantages']}>
        <h2 className="visually-hidden">Наши преимущества</h2>

        <div className="site-container">
          <ul className={cn(styles['advantages__advantage-list'], 'reset-list')}>
            <li className={cn(styles['advantages__advantage-item'], styles['advantage-item'])}>
              <div className={cn(styles['advantage-item__icon'], 'icon-bg--stopwatch-after')}></div>
              <h3 className={styles['advantage-item__title']}>Экономия времени</h3>
              <p className={styles['advantage-item__text']}>
                Мы уже составили идеальные готовые наборы, вам осталось только выбрать подходящий
              </p>
            </li>

            <li className={cn(styles['advantages__advantage-item'], styles['advantage-item'])}>
              <div className={cn(styles['advantage-item__icon'], 'icon-bg--gifts-after')}></div>
              <h3 className={styles['advantage-item__title']}>Широкий ассортимент</h3>
              <p className={styles['advantage-item__text']}>
                На нашем сайте вы сможете найти подходящий подарок на любое мероприятие
              </p>
            </li>

            <li className={cn(styles['advantages__advantage-item'], styles['advantage-item'])}>
              <div className={cn(styles['advantage-item__icon'], 'icon-bg--bow-after')}></div>
              <h3 className={styles['advantage-item__title']}>Отличное качество</h3>
              <p className={styles['advantage-item__text']}>
                Мы все тщаетельно проверяем и красиво упаковываем, чтобы ничто не смогло испортить ваш праздник
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className={cn(styles['offer-section'])}>
        <h2 className="visually-hidden">Популярные товары</h2>

        <PopularProductsContainer />
      </section>

      <section className={cn(styles['delivery-section'])}>
        <div className={cn(styles['delivery-section__container'])}>
          <h2 className={cn(styles['delivery-section__title'], 'site-title')}>Как получить заказ?</h2>

          <DeliveryInfo />

          <Button
            isLink
            href={catalogUrl}
            text="Открыть каталог"
            rootClassName={cn(styles['delivery-section__link'])}
            isCustomDisplayClass
          />
        </div>
      </section>

      <SubscribeBannerContainer />
    </div>
  );
}

export { Page };
