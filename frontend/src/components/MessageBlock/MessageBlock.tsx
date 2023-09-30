import cn from 'classnames';
import { IProps } from './types';
import styles from './style.module.scss';

const MessageBlock = ({ text = 'Список пуст', rootClassName }: IProps) => {
  return (
    <div className={cn(styles['message-wrapper'], rootClassName)}>
      <p className={styles['message-wrapper__text']}>{text}</p>
    </div>
  );
};

export { MessageBlock };
