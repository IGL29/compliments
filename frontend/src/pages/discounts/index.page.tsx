import styles from './style.module.scss';
import cn from 'classnames';
import { Button } from '~components/Button';
import { SubscribeBannerContainer } from '~src/containers/SubscribeBannerContainer/SubscribeBannerContainer';
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
    title: CEO.DISCOUNTS.title,
    description: CEO.DISCOUNTS.description,
  };
}

function Page() {
  return (
    <div className={cn(styles.page, 'page-background--1')}>
      <div className={cn(styles['page__container'], 'decor-container')}>
        <div className={cn(styles['page__content-container'], styles['content-container'], 'decor-content-container')}>
          <section className={cn(styles['content-container__discounts'], styles['discounts'])}>
            <div className={cn(styles['discounts__content-wrapper'])}>
              <h1 className={cn(styles['content-wrapper__title'])}>Наши Скидки</h1>

              <div className={cn(styles['content-wrapper__one-time-discounts'], styles['one-time-discounts'])}>
                <h2 className={cn(styles['one-time-discounts__title'])}>РАЗОВЫЕ</h2>

                <p className={cn(styles['one-time-discounts__paragraph'])}>
                  При заказе на сумму от 10 т.р до 20 т.р скидка —{' '}
                  <span className={cn(styles['text-accent--1'])}>5%</span>
                </p>

                <p className={cn(styles['one-time-discounts__paragraph'])}>
                  При заказе на сумму от 20 т.р — <span className={cn(styles['text-accent--1'])}>7%</span>
                </p>
              </div>

              <div className={cn(styles['content-wrapper__accumulative'], styles['accumulative'])}>
                <h2 className={cn(styles['accumulative__title'])}>НАКОПИТЕЛЬНЫЕ</h2>

                <p className={cn(styles['accumulative__paragraph'])}>
                  На нашем сайте в личном кабинете вы можете накапливать скидку
                </p>

                <div className={cn(styles['accumulative__how-it-work'], styles['how-it-work'])}>
                  <p className={cn(styles['how-it-work__title'])}>Как это работает:</p>

                  <ul className={cn(styles['how-it-work__list'], 'reset-list')}>
                    <li className={cn(styles['how-it-work__item'])}>
                      1. Зарегистрируйтесь на нашем сайте в личном кабинете.
                    </li>

                    <li className={cn(styles['how-it-work__item'])}>
                      <p className={cn(styles['how-it-work__paragraph'])}>2. Делайте заказы и копите скидку:</p>

                      <p className={cn(styles['how-it-work__paragraph'])}>
                        При общей сумме заказов от 15 т.р ваша постоянная скидка&#160;-&#160;
                        <span className={cn(styles['text-accent--1'])}>5%</span>. При общей сумме заказов от 25 т.р ваша
                        постоянная скидка&#160;-&#160;<span className={cn(styles['text-accent--1'])}>7%</span>.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <p className={cn(styles['content-wrapper__paragraph'])}>
                Разовые и накопительные скидки не суммируются. Заказ рассчитывается с наибольшей скидкой.
              </p>

              <div className={cn(styles['content-wrapper__subscription-wrapper'], styles['subscription-wrapper'])}>
                <h2 className={cn(styles['subscription-wrapper__title'])}>Скидка за подписку</h2>

                <p className={cn(styles['subscription-wrapper__paragraph'])}>
                  Подпишись на наши акции и новости и получи дополнительную скидку&#160;-&#160;
                  <span className={cn(styles['text-accent--1'])}>5%</span>.
                  <span className={cn(styles['text-accent--2'])}> Суммируется с другими скидками.</span>
                </p>
              </div>

              <Button
                rootClassName={cn(styles['content-wrapper__btn'])}
                textClassName={cn(styles['content-wrapper__btn-text'])}
                isLink
                href="/profile"
                text="Перейти в личный кабинет"
              />
            </div>

            <div className={cn(styles['discounts__image'])}></div>
          </section>
        </div>
      </div>

      <SubscribeBannerContainer />
    </div>
  );
}

export { Page };
