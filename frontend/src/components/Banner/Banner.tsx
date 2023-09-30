import cn from 'classnames';
import styles from './style.module.scss';
import { Button } from '~components/Button';
import type { IProps } from './types';

const Banner = ({ cbSubscribe }: IProps) => {
  return (
    <div className={cn(styles['banner'])} data-testid="banner">
      <div className={cn(styles['banner__content-wrapper'], styles['content-wrapper'])}>
        <div className={cn(styles['content-wrapper__text-wrapper'])}>
          <p className={cn(styles['content-wrapper__accent-text'])}>получите скидку&#160;5%</p>
          <p className={cn(styles['content-wrapper__descr-text'])}>
            Подпишитесь на наши новости и акции и получите постоянную скидку&#160;5%
          </p>
        </div>

        <Button rootClassName={cn(styles['content-wrapper__btn'])} text="Подписаться" onClick={cbSubscribe} />
      </div>
    </div>
  );
};

export { Banner };
