import cn from 'classnames';
import styles from './style.module.scss';
import { IProps } from './types';

const notifyStatusClassName = {
  message: styles['notify--default'],
  warn: styles['notify--warn'],
  error: styles['notify--error'],
  success: styles['notify--success'],
};
const btnCLoseStatusClassName = {
  message: styles['notify__btn-close--default'],
  warn: styles['notify__btn-close--warn'],
  error: styles['notify__btn-close--error'],
  success: styles['notify__btn-close--success'],
};

const Notify = ({ data, cbDelete, rootClassName }: IProps) => {
  const deleteHandler = () => cbDelete(data.id);

  const notifyClassName = data.status ? notifyStatusClassName[data.status] : notifyStatusClassName['message'];
  const btnCloseClassName = data.status ? btnCLoseStatusClassName[data.status] : btnCLoseStatusClassName['message'];

  return (
    <div className={cn(styles['notify'], notifyClassName, rootClassName)}>
      <button
        className={cn(styles['notify__btn-close'], btnCloseClassName)}
        onClick={deleteHandler}
        aria-label="Закрыть уведомление"
      ></button>
      {data.content}
    </div>
  );
};

export { Notify };
