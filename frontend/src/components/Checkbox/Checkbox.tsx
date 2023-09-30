import cn from 'classnames';
import { nanoid } from 'nanoid';
import { ChangeEvent, useRef } from 'react';
import styles from './style.module.scss';
import { IProps } from './types';

const Checkbox = ({
  inputId,
  isChecked,
  isDisabled,
  isRequired = false,
  cbChangeChecked,
  rootClassName,
  checkboxWrapperClassName,
  checkboxPosition = 'top',
  children,
  error,
  cbChangeBlur,
}: IProps) => {
  const id = useRef(inputId || nanoid());

  const changeCheckboxHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!cbChangeChecked) {
      return;
    }
    cbChangeChecked(ev.target.checked);
  };

  const checkboxPositionClassName =
    checkboxPosition === 'center'
      ? styles['checkbox-wrapper__input-wrapper--center']
      : styles['checkbox-wrapper__input-wrapper--top'];

  const inputDisabledClassName = isDisabled ? styles['input-wrapper--disabled'] : '';
  const labelDisabledClassName = isDisabled ? styles['checkbox-wrapper__label--disabled'] : '';
  const checkboxErrorClassName = error ? styles['input-wrapper--error'] : '';

  const onBlurHandler = cbChangeBlur ? { onBlur: () => cbChangeBlur() } : {};

  return (
    <div className={cn(rootClassName, styles['checkbox-wrapper'])} data-testid="checkbox">
      <div
        className={cn(
          styles['checkbox-wrapper__input-wrapper'],
          styles['input-wrapper'],
          checkboxPositionClassName,
          checkboxWrapperClassName,
          inputDisabledClassName,
          checkboxErrorClassName,
        )}
      >
        <input
          className={cn(styles['input-wrapper__input'])}
          type="checkbox"
          id={id.current}
          checked={isChecked}
          onChange={changeCheckboxHandler}
          disabled={isDisabled}
          required={isRequired}
          {...onBlurHandler}
          data-testid="checkboxInput"
        />
        <div className={cn(styles['input-wrapper__custom-checkbox'])}></div>
      </div>

      <label className={cn(styles['checkbox-wrapper__label'], labelDisabledClassName)} htmlFor={id.current}>
        {children}
      </label>
    </div>
  );
};

export { Checkbox };
