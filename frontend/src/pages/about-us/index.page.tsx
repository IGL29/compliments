import cn from 'classnames';
import styles from './style.module.scss';
import { Button } from '~components/Button';
import { ROUTES_DATA } from '~data/routes';
import { Image } from '~components/Image/Image';
import example1Img from '/public/img/example-1.jpg';
import example2Img from '/public/img/example-2.jpg';
import example3Img from '/public/img/example-3.jpg';
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
    title: CEO.ABOUT_US.title,
    description: CEO.ABOUT_US.description,
  };
}

function Page() {
  return (
    <div className={cn(styles['about-us'])}>
      <section className={cn(styles['about-us__about-us-section'], styles['about-us-section'])}>
        <div className={cn('site-container', styles['about-us-section__container'])}>
          <div className={cn(styles['about-us-section__content-wrapper'], styles['content-wrapper'])}>
            <h1 className={cn(styles['content-wrapper__title'])}>О нас</h1>

            <p className={cn(styles['content-wrapper__paragraph'])}>
              Мы поставили себе непростую задачу - сделать красоту доступной каждому. Высокая флористика, как и высокая
              мода, является дорогой рекламой и частью светской жизни, так далеко расположенной от обычного человека. Мы
              идем в ногу со временем и адаптируем моду на цветы в повседневное русло. Покупаем и используем
              качественные и уже знакомые всем цветы, собираем стильные и недорогие букеты, чтобы приносить радость с
              каждой покупкой. С цветами люди передают свои чувства, эмоции, переживания и самое главное - любовь.
            </p>

            <p className={cn(styles['content-wrapper__paragraph'])}>
              В нашем подходе к цветочному искусству есть простота, вкус и современность. В каждый букет мы вкладываем
              частичку души, собираем его с особой тщательностью и любовью. В них нет ничего сверхъестественного, но
              есть гармония и красота. Подчеркиваем индивидуальность каждого цветка, сочетаем его с наиболее выгодной
              позиции, находим пару или подходящий ансамбль.
            </p>

            <p className={cn(styles['content-wrapper__paragraph'])}>
              В ассортименте нашего магазина всегда есть розы, тюльпаны, хризантемы, герберы, подсолнухи, эустома,
              ирисы, фрезия, лотосы, кустовые ромашки, ягоды, клематисы, орнитагалум, протея и многие другие. В
              зависимости от времени годы мы закупаем сезонные растения: летом это ежевика, дельфиниум, львиный зев,
              васильки, осенью - ягоды рябины, яблоки, георгины, астры, зимой - илекс, остролист, шишки, еловые ветки,
              хамелациум, весной - ландыши, пионы. мы дополняем букеты цветов сочной и разнообразной зеленью:
              папоротником, салалом, эвкалиптом, пастушьей сумкой, рускусом, питтоспорумом. Наши букеты упакованы в
              крафтовую бумагу или обрамлены пышной зеленью.
            </p>

            <Button
              isLink
              href={ROUTES_DATA.CATEGORIES.url}
              rootClassName={cn(styles['content-wrapper__btn'])}
              textClassName={cn(styles['content-wrapper__btn-text'])}
              text="Открыть каталог"
            />
          </div>

          <div className={cn(styles['about-us-section__bg'], styles['bg'])}></div>
        </div>
      </section>

      <section className={cn(styles['about-us__how-we-work'], styles['how-we-work'])}>
        <div className={cn('site-container', styles['how-we-work__container'])}>
          <h2 className={cn(styles['how-we-work__title'])}>Как составляются подарки?</h2>

          <p className={styles['how-we-work__text']}>
            Букеты собираются непосредственно перед доставкой из самых свежих цветов. Каждый цветок обрабатывается
            специальным образом для увеличения его вазостойкости и сохранения целостности каждого цветка при
            транспортировке. В нашей команде работают только опытные флористы, в совершенстве владеющие техникой сборки
            различных по сложности и составу букетов. Заглянув &quot;внутрь&quot; букета вы найдете только свежие
            ароматные цветы и хорошую зелень, &quot;чистую&quot; спиральную сборку, ровную ножку и аккуратную
            &quot;шапку&quot;.
          </p>
        </div>

        <div className={cn(styles['how-we-work__example-list-wrapper'])}>
          <ul className={cn(styles['how-we-work__example-list'], 'reset-list')}>
            <li className={cn(styles['how-we-work__example-item'])}>
              <Image
                className={cn(styles['how-we-work__example-img'])}
                src={example2Img}
                alt="Пример подарка на восьмое марта"
              />
            </li>

            <li className={cn(styles['how-we-work__example-item'], styles['how-we-work__example-item--big'])}>
              <Image
                className={cn(styles['how-we-work__example-img'])}
                src={example1Img}
                alt="Пример подарка на восьмое марта"
              />
            </li>

            <li className={cn(styles['how-we-work__example-item'])}>
              <Image
                className={cn(styles['how-we-work__example-img'])}
                src={example3Img}
                alt="Пример подарка на восьмое марта"
              />
            </li>
          </ul>
        </div>
      </section>

      <SubscribeBannerContainer />
    </div>
  );
}

export { Page };
