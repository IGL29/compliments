import cn from 'classnames';
import { Button } from '~src/components/Button';
import styles from './error-page.module.scss';
import { ROUTES_DATA } from '~src/data/routes';

function Page({ is404 }: { is404: boolean }) {
  if (is404) {
    return (
      <div className={styles['page']}>
        <div className="site-container">
          <h1 className={cn(styles['page__title'], styles.title)}>404</h1>
          <p className={cn(styles['page__text'], styles.text)}>Страница не найдена.</p>
          <div className={cn(styles['page__link-wrapper'], styles['link-wrapper'])}>
            <Button isLink rootClassName={styles.link} href={ROUTES_DATA.MAIN.url} text="На главную"></Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1>500 Internal Error</h1>
        <p>Something went wrong.</p>
      </>
    );
  }
}

export { Page };
