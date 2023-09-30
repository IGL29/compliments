import { ChangeEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Button } from '~components/Button';
import styles from './style.module.scss';
import { IProps } from './types';
import { getDecimalNumber } from '~src/utils/getDecimalNumber';
import { nanoid } from 'nanoid';

const Counter = ({
  rootClassName,
  value: externalValue,
  id,
  cbChangeValue,
  min,
  max,
  delay,
  isDisabled = false,
  isHideButtons = false,
}: IProps) => {
  const [innerValue, setInnerValue] = useState(externalValue || 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const changingTimerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputIdRef = useRef<string>();

  useEffect(() => {
    inputIdRef.current = id || nanoid();
  }, [])

  const displayedValue = String(externalValue !== undefined && changingTimerIdRef.current === null ? externalValue : innerValue);

  const throttleValueChanging = (result: number) => {
    if (changingTimerIdRef.current) {
      clearTimeout(changingTimerIdRef.current);
      changingTimerIdRef.current = null;
    }
    setInnerValue(getResolvedValue(result));

    changingTimerIdRef.current = setTimeout(() => {
      cbChangeValue(getResolvedValue(result));
    }, delay);
  };

  const btnClickHandler = (action: 'decrement' | 'increment') => {
    if (!inputRef.current || isDisabled) {
      return;
    }
    const actionValue = action === 'decrement' ? -1 : 1;
    const currentValue = Number(inputRef.current.value) + actionValue;
    setInputValue(currentValue);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    if (isDisabled) {
      return;
    }
    const result: number = getDecimalNumber(event.target.value);
    setInputValue(result);
  };

  const setInputValue = (value: number) => {
    const resolvedValue = getResolvedValue(value);

    if (delay === undefined) {
      setInnerValue(resolvedValue);
      cbChangeValue(resolvedValue);
      return;
    }
    throttleValueChanging(resolvedValue);
  };

  const getResolvedValue = (value: number) => {
    if (min !== undefined && value < min) {
      return min;
    }
    if (max !== undefined && value > max) {
      return max;
    }
    return value;
  };

  return (
    <div className={cn(styles['counter'], rootClassName)} data-testid="counter">
      {!isHideButtons && (
        <Button
          rootClassName={cn(styles['counter__btn'], styles['counter__btn--decr'])}
          textClassName={cn(styles['counter__btn-text'])}
          text="-"
          onClick={() => btnClickHandler('decrement')}
          variant={4}
          ariaLabel="Уменьшить"
          isDisabled={isDisabled}
          size="unset"
        />
      )}

      <input
        id={inputIdRef.current}
        className={cn(styles['counter__input'])}
        ref={inputRef}
        type="number"
        value={displayedValue}
        onChange={onChangeHandler}
        min={min}
        max={max}
        disabled={isDisabled}
        data-testid="counterInput"
      />

      <label className="visually-hidden" htmlFor={inputIdRef.current}>
        Введите число
      </label>

      {!isHideButtons && (
        <Button
          rootClassName={cn(styles['counter__btn'], styles['counter__btn--incr'])}
          textClassName={cn(styles['counter__btn-text'])}
          text="+"
          onClick={() => btnClickHandler('increment')}
          variant={4}
          ariaLabel="Увеличить"
          isDisabled={isDisabled}
          size="unset"
        />
      )}
    </div>
  );
};

export { Counter };
