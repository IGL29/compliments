import cn from 'classnames';
import styles from './style.module.scss';
import { IProps } from './types';

const Modal = ({ isBgSuccess = false, children, cbCloseModal }: IProps) => {
  const bgSuccessClassName = isBgSuccess ? styles['bg--success'] : '';
  const closeHandlerClick = () => cbCloseModal();

  return (
    <div className={cn(styles['modal-wrapper'])}>
      <div className={cn(styles['modal-wrapper__modal-background'])} onClick={closeHandlerClick}></div>

      <div className={cn(styles['modal-wrapper__modal-container'])}>
        <div className={cn(styles['modal-wrapper__modal'], styles['modal'])}>
          <div className={cn(styles['modal__content-wrapper'])}>
            <div className={cn(styles['modal__bg'], styles['bg'], bgSuccessClassName)}></div>
            <div className={cn(styles['modal__modal-content'], styles['modal-content'])}>
              <button
                className={cn(styles['modal-content__btn-close'], styles['btn-close'])}
                onClick={closeHandlerClick}
                aria-label="Закрыть модальное окно"
              ></button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
