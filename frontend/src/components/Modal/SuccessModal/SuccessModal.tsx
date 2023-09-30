import cn from 'classnames';
import styles from './style.module.scss';
import { Modal } from '../Modal';
import { IProps } from './types';

const SuccessModal = ({ title, text, children, cbCloseModal }: IProps) => {
  return (
    <Modal cbCloseModal={cbCloseModal} isBgSuccess>
      <div className={cn(styles['content'])}>
        <div className={cn(styles['content__img'])}></div>

        <h2 className={cn(styles['content__title'])}>{title}</h2>

        <p className={cn(styles['content__text'])}>{text}</p>

        {children}
      </div>
    </Modal>
  );
};

export { SuccessModal };
