import { Button } from '~components/Button';
import styles from './style.module.scss';
import cn from 'classnames';
import { IProps } from './types';

enum ButtonActiveVariant {
  INACTIVE = 5,
  ACTIVE = 1,
}

const Pagination = ({ value, cbChangeValue, count }: IProps) => {
  const getButtonVariant = (buttonValue: number) =>
    buttonValue === value ? ButtonActiveVariant.ACTIVE : ButtonActiveVariant.INACTIVE;

  const buttonsJSX = Array(count)
    .fill(null)
    .map((_, index) => {
      const buttonValue = index + 1;
      return (
        <Button
          rootClassName={cn(styles['pagination__part-btn'])}
          textClassName={cn(styles['pagination__part-text-btn'])}
          text={`${buttonValue}`}
          variant={getButtonVariant(buttonValue)}
          onClick={() => cbChangeValue(buttonValue)}
          key={buttonValue}
        />
      );
    });

  const onClickPrevHandler = () => {
    if (value <= 1) {
      return;
    }
    cbChangeValue(value - 1);
  };

  const onClickNextHandler = () => {
    if (value >= count) {
      return;
    }
    cbChangeValue(value + 1);
  };

  return (
    <div className={cn(styles['pagination'])}>
      <button
        className={cn(styles['pagination__btn'], styles['pagination__btn--back'])}
        onClick={onClickPrevHandler}
        aria-label="Перейти на предыдущую страницу"
      ></button>

      <div className={cn(styles['pagination__part-btns-wrapper'])}>{buttonsJSX}</div>

      <button
        className={cn(styles['pagination__btn'], styles['pagination__btn--next'])}
        onClick={onClickNextHandler}
        aria-label="Перейти на следуюущую страницу"
      ></button>
    </div>
  );
};

export { Pagination };
