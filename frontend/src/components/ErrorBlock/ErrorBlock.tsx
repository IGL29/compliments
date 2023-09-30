import cn from 'classnames';
import { Button } from '../Button';
import { IProps } from './types';
import styles from './style.module.scss';

const ErrorBlock = ({ text = 'Произошла ошибка при запросе.', rootClassName, cbRepeatRequest }: IProps) => {
  return (
    <div className={cn(styles['error-wrapper'], rootClassName)}>
      <p className={styles['error-wrapper__text']}>{text}</p>
      {cbRepeatRequest && (
        <Button rootClassName={styles['error-wrapper__btn']} text="Повторить" onClick={cbRepeatRequest} />
      )}
    </div>
  );
};

export { ErrorBlock };
