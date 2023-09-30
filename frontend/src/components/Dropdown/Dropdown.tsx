import { forwardRef } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { IProps } from './types';

const Dropdown = forwardRef<HTMLDivElement, IProps>(function Dropdown(
  { rootClassName, children, isOpen, cbChangeIsOpen }: IProps,
  ref,
) {
  const onClickHandler = () => cbChangeIsOpen(!isOpen);

  return (
    <div className={cn(rootClassName, styles['dropdown'])} ref={ref}>
      <div onClick={onClickHandler}>{children[0]}</div>

      {isOpen && <div className={cn(styles['dropdown__wrapper-content'])}>{children[1]}</div>}
    </div>
  );
});

export { Dropdown };
