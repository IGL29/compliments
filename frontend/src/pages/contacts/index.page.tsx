import styles from './styles.module.scss';
import cn from 'classnames';
import { Icon } from '~components/icons/Icon';
import { FeedbackContainer } from '~src/containers/FeedbackContainer/FeedbackContainer';
import { SubscribeBannerContainer } from '~src/containers/SubscribeBannerContainer/SubscribeBannerContainer';
import { CEO } from '~src/data/CEO';
import { SHOP_CONTACTS } from '~src/data/contacts';
import { TransformDataService } from '~src/services/TransformDataService';
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
    title: CEO.CONTACTS.title,
    description: CEO.CONTACTS.description,
  };
}

function Page() {
  const hrefTel = `tel:${SHOP_CONTACTS.phone}`;
  const hrefEmail = `tel:${SHOP_CONTACTS.email}`;

  return (
    <div className={cn(styles.page, 'page-background--1')}>
      <div className={cn(styles['page__container'], 'decor-container')}>
        <div className={cn(styles['page__content-container'], styles['content-container'], 'decor-content-container')}>
          <section className={cn(styles['content-container__contacts'], styles['contacts'])}>
            <div className={cn(styles['contacts__content-wrapper'])}>
              <h2 className={cn(styles['content-wrapper__title'], styles['title'])}>Наши контакты</h2>

              <p className={cn(styles['content-wrapper__text'])}>
                Мы всегда рады ответить на возникшие вопросы и помочь вам с выбором идеального подарка.
              </p>

              <div className={cn(styles['content-wrapper__us-contacts-wrapper'], styles['us-contacts-wrapper'])}>
                <div className={cn(styles['us-contacts-wrapper__row'], styles['us-contacts-wrapper__row--1'])}>
                  <div className={cn(styles['us-contacts-wrapper__head'])}>Режим работы:</div>
                  <div className={cn(styles['us-contacts-wrapper__body'])}>с 9:00 до 19:00 (Пн-Сб)</div>
                </div>

                <div className={cn(styles['us-contacts-wrapper__row'], styles['us-contacts-wrapper__row--2'])}>
                  <div className={cn(styles['us-contacts-wrapper__head'])}>Телефон:</div>
                  <div className={cn(styles['us-contacts-wrapper__body'])}>
                    <a href={hrefTel}>{TransformDataService.toViewPhone(SHOP_CONTACTS.phone)}</a>
                  </div>
                </div>

                <div className={cn(styles['us-contacts-wrapper__row'], styles['us-contacts-wrapper__row--3'])}>
                  <div className={cn(styles['us-contacts-wrapper__head'])}>E-mail:</div>
                  <div className={cn(styles['us-contacts-wrapper__body'])}>
                    <a href={hrefEmail}>info@complimente.ru</a>
                  </div>
                </div>
              </div>

              <div className={cn(styles['contacts__social-wrapper'])}>
                <a className={cn(styles['social-wrapper__link'])} href="." aria-label="Телеграм">
                  <Icon className={cn(styles['social-wrapper__icon'])} icon="telegram"></Icon>
                </a>

                <a className={cn(styles['social-wrapper__link'])} href="." aria-label="Вотсап">
                  <Icon className={cn(styles['social-wrapper__icon'])} icon="whatsapp"></Icon>
                </a>
              </div>
            </div>

            <div className={cn(styles['contacts__image'])}></div>
          </section>

          <div className={cn(styles['content-container__sections-wrapper'], styles['sections-wrapper'])}>
            <section className={cn(styles['sections-wrapper__requisites'], styles['requisites'])}>
              <h2 className={cn(styles['requisites__title'], styles['title'])}>Наши реквизиты</h2>

              <div className={cn(styles['requisites__text'])}>
                <p className={cn(styles['requisites__text-paragraph'])}>ИП Золотов Роман Анатольевич</p>
                <p className={cn(styles['requisites__text-paragraph'])}>ИНН 772 160 383 574</p>
                <p className={cn(styles['requisites__text-paragraph'])}>ОГРНИП 320 265 100 053 688</p>
                <p className={cn(styles['requisites__text-paragraph'])}>
                  Филиал «Корпоративный» ПАО «Совкомбанк» (г. Москва)
                </p>
                <p className={cn(styles['requisites__text-paragraph'])}>БИК 044 525 360</p>
                <p className={cn(styles['requisites__text-paragraph'])}>р/с 40 802 810 012 550 063 868</p>
                <p className={cn(styles['requisites__text-paragraph'])}>к/c 30 101 810 445 250 000 360</p>
              </div>
            </section>

            <section className={cn(styles['feedback'])}>
              <h2 className={cn(styles['feedback__title'], styles['title'])}>Форма обратной связи</h2>

              <FeedbackContainer />
            </section>
          </div>
        </div>
      </div>

      <SubscribeBannerContainer />
    </div>
  );
}

export { Page };
