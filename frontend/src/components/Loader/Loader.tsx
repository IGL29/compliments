import cn from 'classnames';
import styles from './style.module.scss';
import { IProps } from './types';

const Loader = ({ text, isShowIcon = true, rootClassName }: IProps) => {
  return (
    <div className={cn(rootClassName, styles['loader'])}>
      {isShowIcon && <div className={cn(styles['loader__svg'])}></div>}
      {text && <p className={styles['loader__text']}>{text}</p>}
    </div>
  );
};

export { Loader };
