import cn from 'classnames';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { Button } from '~components/Button';
import { Icon } from '~components/icons/Icon';
import { useViewportSize } from '~hooks/useViewportSize';
import { AddressContainer } from '~src/containers/AddressContainer';
import styles from './style.module.scss';
import type { IProps } from './types';
import { ROUTES_DATA } from '~src/data/routes';
import { NavList } from '../NavList';

const Header = ({ rootClassName, userName, cartCount, cbOpenBurgerMenu, cbOpenAuthModal }: IProps) => {
  const [_, breakPoints] = useViewportSize();

  const signinTextBtn = breakPoints.equalAndBelow.md ? '' : 'Войти';
  const profileTextBtn = breakPoints.equalAndBelow.sm ? '' : userName;
  const wrapperCartBtnAttr = cartCount ? { 'data-count': cartCount } : {};

  const sliderInterval = 4000;
  const isPlayingSlider = !import.meta.env.SSR;

  return (
    <>
      <header className={cn(styles['header'], rootClassName)}>
        <div className={cn(styles['header__row-0'], styles['row-0'])}>
          <div className={cn('site-container', styles['row-0__container'])}>
            <CarouselProvider
              className={cn(styles.carousel)}
              totalSlides={4}
              infinite={true}
              isIntrinsicHeight
              visibleSlides={1}
              naturalSlideWidth={100}
              naturalSlideHeight={50}
              isPlaying={isPlayingSlider}
              interval={sliderInterval}
            >
              <ButtonBack className={cn(styles['carousel__btn'], styles['carousel__btn--back'])}>
                <Icon icon="arrow" viewBox="0 0 25 25" />
              </ButtonBack>

              <ButtonNext className={cn(styles['carousel__btn'], styles['carousel__btn--next'])}>
                <Icon icon="arrow" viewBox="0 0 25 25" />
              </ButtonNext>

              <Slider className={cn(styles.slider)} classNameTray={cn(styles['slider-tray'])}>
                <Slide index={0} className={cn(styles['slider__slide'], styles.slide)}>
                  <div className={cn(styles['slide__slide-content'], styles['slide-content'])}>
                    <div className={cn(styles['slide-content__icon-wrapper'], styles['icon-wrapper'])}>
                      <Icon icon="advertisement" className={cn(styles['icon-wrapper__icon'])} viewBox="0 0 32 32" />
                    </div>
                    <p className={cn(styles['slide-content__text'])}>Гарантия качества</p>
                  </div>
                </Slide>

                <Slide index={1} className={cn(styles['slider__slide'], styles.slide)}>
                  <div className={cn(styles['slide__slide-content'], styles['slide-content'])}>
                    <div className={cn(styles['slide-content__icon-wrapper'], styles['icon-wrapper'])}>
                      <Icon icon="discount" className={cn(styles['icon-wrapper__icon'])} />
                    </div>
                    <p className={cn(styles['slide-content__text'])}>Система скидок</p>
                  </div>
                </Slide>

                <Slide index={2} className={cn(styles['slider__slide'], styles.slide)}>
                  <div className={cn(styles['slide__slide-content'], styles['slide-content'])}>
                    <div className={cn(styles['slide-content__icon-wrapper'], styles['icon-wrapper'])}>
                      <Icon icon="countryEnvelop" className={cn(styles['icon-wrapper__icon'])} viewBox="0 0 38 33" />
                    </div>
                    <p className={cn(styles['slide-content__text'])}>Бесплатная открытка</p>
                  </div>
                </Slide>

                <Slide index={3} className={cn(styles['slider__slide'], styles.slide)}>
                  <div className={cn(styles['slide__slide-content'], styles['slide-content'])}>
                    <div className={cn(styles['slide-content__icon-wrapper'], styles['icon-wrapper'])}>
                      <Icon icon="anonymousDelivery" className={cn(styles['icon-wrapper__icon'])} viewBox="0 0 28 28" />
                    </div>
                    <p className={cn(styles['slide-content__text'])}>Анонимная доставка</p>
                  </div>
                </Slide>
              </Slider>
            </CarouselProvider>
          </div>
        </div>

        <div className={cn(styles['header__row-1'], styles['row-1'])}>
          <div className={cn(styles['row-1__container'], 'site-container')}>
            <Button
              icon="burgerMenu"
              rootClassName={cn(styles['row-1__burger-menu-btn'], styles['burger-menu-btn'])}
              iconWrapperClassName={cn(styles['burger-menu-icon-wrapper'])}
              isRoundedFull
              iconViewBox="0 -1 11 10"
              onClick={() => cbOpenBurgerMenu()}
              size='unset'
            ></Button>

            <a href={ROUTES_DATA.MAIN.url} className={cn(styles['row-1__logo'], styles.logo)} aria-label="На главную" />

            <CarouselProvider
              className={cn(styles['row-1__carousel'], styles.carousel)}
              totalSlides={4}
              infinite={true}
              isIntrinsicHeight
              visibleSlides={3}
              naturalSlideWidth={156}
              naturalSlideHeight={100}
              interval={sliderInterval}
              isPlaying={isPlayingSlider}
            >
              <ButtonBack className={cn(styles['carousel__btn'], styles['carousel__btn--back'])}>
                <Icon icon="arrow" viewBox="0 0 25 25" />
              </ButtonBack>

              <ButtonNext className={cn(styles['carousel__btn'], styles['carousel__btn--next'])}>
                <Icon icon="arrow" viewBox="0 0 25 25" />
              </ButtonNext>

              <Slider className={cn(styles.slider)}>
                <Slide index={0} className={cn(styles['slider__slide'], styles.slide)}>
                  <div className={cn(styles['slide__slide-content'], styles['slide-content'])}>
                    <div className={cn(styles['slide-content__icon-wrapper'], styles['icon-wrapper'])}>
                      <Icon icon="advertisement" className={cn(styles['icon-wrapper__icon'])} viewBox="0 0 32 32" />
                    </div>
                    <p className={cn(styles['slide-content__text'])}>Гарантия качества</p>
                  </div>
                </Slide>

                <Slide index={1} className={cn(styles['slider__slide'], styles.slide)}>
                  <div className={cn(styles['slide__slide-content'], styles['slide-content'])}>
                    <div className={cn(styles['slide-content__icon-wrapper'], styles['icon-wrapper'])}>
                      <Icon icon="discount" className={cn(styles['icon-wrapper__icon'])} />
                    </div>
                    <p className={cn(styles['slide-content__text'])}>Система скидок</p>
                  </div>
                </Slide>

                <Slide index={2} className={cn(styles['slider__slide'], styles.slide)}>
                  <div className={cn(styles['slide__slide-content'], styles['slide-content'])}>
                    <div className={cn(styles['slide-content__icon-wrapper'], styles['icon-wrapper'])}>
                      <Icon icon="countryEnvelop" className={cn(styles['icon-wrapper__icon'])} viewBox="0 0 38 33" />
                    </div>
                    <p className={cn(styles['slide-content__text'])}>Бесплатная открытка</p>
                  </div>
                </Slide>

                <Slide index={3} className={cn(styles['slider__slide'], styles.slide)}>
                  <div className={cn(styles['slide__slide-content'], styles['slide-content'])}>
                    <div className={cn(styles['slide-content__icon-wrapper'], styles['icon-wrapper'])}>
                      <Icon icon="anonymousDelivery" className={cn(styles['icon-wrapper__icon'])} viewBox="0 0 28 28" />
                    </div>
                    <p className={cn(styles['slide-content__text'])}>Анонимная доставка</p>
                  </div>
                </Slide>
              </Slider>
            </CarouselProvider>

            <AddressContainer rootClassName={styles['row-1__address']} />

            <div className={cn(styles['row-1__action-btns-wrapper'], styles['action-btns-wrapper'])}>
              <div
                className={cn(styles['row-1__wrapper-cart-btn'], styles['wrapper-cart-btn'])}
                {...wrapperCartBtnAttr}
              >
                <Button
                  isLink
                  href={ROUTES_DATA.CART.url}
                  icon="cart"
                  rootClassName={cn(styles['action-btns-wrapper__cart-link'], styles['cart-btn'])}
                  isRoundedFull
                  iconWrapperClassName={cn(styles['cart-icon-wrapper'])}
                  iconViewBox="0 0 30 30"
                  size="unset"
                  ariaLabel="Перейти в корзину"
                />
              </div>

              {!userName && (
                <Button
                  text={signinTextBtn}
                  icon="signin"
                  rootClassName={cn(styles['signin-btn'])}
                  iconWrapperClassName={cn(styles['btn-icon-wrapper'])}
                  iconViewBox="0 0 20 20"
                  onClick={cbOpenAuthModal}
                  ariaLabel="Открыть форму для входа"
                />
              )}

              {userName && (
                <Button
                  isLink
                  text={profileTextBtn}
                  href={ROUTES_DATA.PROFILE.url}
                  icon="user"
                  rootClassName={cn(styles['signin-btn'])}
                  iconWrapperClassName={cn(styles['btn-icon-wrapper'])}
                  iconViewBox="2 3 22 22"
                  ariaLabel="Перейти в профиль"
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles['row-2']}>
          <div className={styles['row-2__container']}>
            <NavList isHeader />
          </div>
        </div>
      </header>
    </>
  );
};

export { Header };
