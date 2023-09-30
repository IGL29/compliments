import { Dropdown } from '~components/Dropdown/Dropdown';
import styles from './style.module.scss';
import cn from 'classnames';
import type { IProps, Option } from './types';
import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '~src/hooks/useOutsideClick';
import { isNodeGuard } from '~src/types/guards/isNodeGuard';

const Select = ({ rootClassName, options, activeOptionIndex, cbChangeOptionIndex, isChangeButton = true }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const outsideClick = useOutsideClick();

  useEffect(() => {
    if (
      isOpen &&
      dropdownRef.current &&
      outsideClick?.target &&
      isNodeGuard(outsideClick.target) &&
      !dropdownRef.current.contains(outsideClick.target)
    ) {
      setIsOpen(false);
    }
  }, [outsideClick]);

  const selectOptionHandler = (index: number) => {
    cbChangeOptionIndex(index);
  };

  const buttonText = isChangeButton ? options[activeOptionIndex].text : options[0].text;

  const getOptionActiveClassName = (index: number) =>
    index === activeOptionIndex ? styles['select-item--active'] : '';

  const optionsJSX = options.slice(1).map((option: Option, index: number) => {
    const optionIndex = index + 1;
    return (
      <li
        className={cn(styles['select__select-item'], styles['select-item'], getOptionActiveClassName(optionIndex))}
        key={index}
      >
        <button className={cn(styles['select-item__btn'])} onClick={() => selectOptionHandler(optionIndex)}>
          {option.text}
        </button>
      </li>
    );
  });

  const changeIsOpenHandler = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const btnIsActiveClassName = isOpen ? styles['btn-wrapper--active'] : '';

  return (
    <Dropdown
      rootClassName={cn(rootClassName, styles['select'])}
      isOpen={isOpen}
      cbChangeIsOpen={changeIsOpenHandler}
      ref={dropdownRef}
    >
      <div className={cn(styles['select__btn-wrapper'], styles['btn-wrapper'], btnIsActiveClassName)}>
        <button className={cn(styles['btn-wrapper__btn'])}>{buttonText}</button>
      </div>

      <ul className={cn(styles['select__select-list'], styles['select-list'])}>{optionsJSX}</ul>
    </Dropdown>
  );
};

export { Select };
