import cn from 'classnames';
import { ChangeEvent } from 'react';
import styles from './style.module.scss';
import { IProps } from './types';

function RadioButton<T extends string>({
  inputId,
  inputName,
  activeInputName,
  cbChangeChecked,
  rootClassName,
  checkboxWrapperClassName,
  checkboxPosition = 'top',
  cbChangeBlur,
  error,
  children,
}: IProps<T>) {
  const changeCheckboxHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!cbChangeChecked) {
      return;
    }
    cbChangeChecked(ev.target.name as typeof inputName);
  };

  const isChecked = activeInputName === inputName;

  const checkboxPositionClassName =
    checkboxPosition === 'center'
      ? styles['radio-wrapper__input-wrapper--center']
      : styles['radio-wrapper__input-wrapper--top'];

  const onBlurHandler = cbChangeBlur ? { onBlur: () => cbChangeBlur() } : {};
  const wrapperErrorClassName = error ? styles['input-wrapper--error'] : '';

  return (
    <div className={cn(rootClassName, styles['radio-wrapper'])}>
      <div
        className={cn(
          styles['radio-wrapper__input-wrapper'],
          styles['input-wrapper'],
          checkboxPositionClassName,
          checkboxWrapperClassName,
          wrapperErrorClassName,
        )}
      >
        <input
          className={cn(styles['input-wrapper__input'])}
          type="radio"
          id={inputId}
          name={inputName}
          checked={isChecked}
          onChange={changeCheckboxHandler}
          {...onBlurHandler}
        />
        <div className={cn(styles['input-wrapper__custom-radio'])}></div>
      </div>

      <label className={cn(styles['radio-wrapper__label'])} htmlFor={inputId}>
        {children}
      </label>
    </div>
  );
}

export { RadioButton };
