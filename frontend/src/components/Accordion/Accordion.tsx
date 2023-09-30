import cn from 'classnames';
import styles from './style.module.scss';
import { useState } from 'react';
import type { IProps } from './types';

const Accordion = ({ children, isOpenState = false, rootClassName, buttonWrapperClassName }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenState);

  const openBtnClassName = isOpen ? styles['filters__btn-wrapper--active'] : '';
  const onClickHandler = () => setIsOpen((state) => !state);

  return (
    <div className={cn(styles['filters'], rootClassName)} data-testid="accordion">
      <div
        className={cn(buttonWrapperClassName, styles['filters__btn-wrapper'], openBtnClassName)}
        onClick={onClickHandler}
      >
        {children[0]}
      </div>

      {isOpen && children[1]}
    </div>
  );
};

export { Accordion };
