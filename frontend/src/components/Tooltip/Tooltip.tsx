import cn from 'classnames';
import styles from './style.module.scss';
import { IProps } from './types';
import { useRef } from 'react';
import { nanoid } from 'nanoid';

const Tooltip = ({
  rootClassName,
  contentClassName,
  verticalPosition = 'top',
  horizontalPosition = 'right',
  id,
  children,
}: IProps) => {
  const idRef = useRef(id || nanoid());

  const horizontalClassName =
    horizontalPosition === 'left'
      ? styles['tooltip__content--right-full']
      : horizontalPosition === 'middle'
      ? styles['tooltip__content--left-middle']
      : styles['tooltip__content--left-full'];
  const verticalClassName =
    verticalPosition === 'bottom'
      ? styles['tooltip__content--top-full']
      : verticalPosition === 'middle'
      ? styles['tooltip__content--top-middle']
      : styles['tooltip__content--bottom-full'];

  return (
    <div className={cn(rootClassName, styles['tooltip'])}>
      <div className={styles['tooltip__trigger']} aria-labelledby={idRef.current} tabIndex={0}>
        {children[0]}
      </div>

      <div
        className={cn(styles['tooltip__content'], contentClassName, verticalClassName, horizontalClassName)}
        role="tooltip"
        id={idRef.current}
      >
        {children[1]}
      </div>
    </div>
  );
};

export { Tooltip };
