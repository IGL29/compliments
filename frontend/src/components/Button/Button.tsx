import cn from 'classnames';
import styles from './style.module.scss';
import { Icon, TIcon } from '~components/icons/Icon';
import { sizeClassNames, variantClassNames } from './data';
import type { IProps, Size, Variant } from './types';

const getVariant = (variant?: Variant) => {
  return variant ? styles[variantClassNames?.[variant]] : styles[variantClassNames[1]];
};

const getSize = (size?: Size) => {
  return size ? styles[sizeClassNames[size]] : styles[sizeClassNames['default']];
};

const getContent = (
  text?: string,
  icon?: TIcon,
  iconWrapperClassName?: string,
  iconViewBox?: string,
  textClassName?: string,
  wrapperContentClassName?: string,
) => {
  if (text && icon) {
    return (
      <div className={cn(styles['content-wrapper'], wrapperContentClassName)}>
        <div className={cn(styles['icon-wrapper'], styles['icon-wrapper--mr'], iconWrapperClassName)}>
          <Icon icon={icon} viewBox={iconViewBox} />
        </div>
        <p className={cn(textClassName, styles['button__text'])}>{text}</p>
      </div>
    );
  }
  if (text) {
    return (
      <div className={cn(styles['content-wrapper'], wrapperContentClassName)}>
        <p className={cn(textClassName, styles['button__text'])}>{text}</p>
      </div>
    );
  }
  if (icon) {
    return (
      <div className={cn(styles['content-wrapper'])}>
        <div className={cn(styles['icon-wrapper'], iconWrapperClassName)}>
          <Icon icon={icon} viewBox={iconViewBox} />
        </div>
      </div>
    );
  }
};

const Button = ({
  variant,
  size,
  text,
  icon,
  id,
  type = 'button',
  iconWrapperClassName,
  rootClassName,
  wrapperContentClassName,
  textClassName,
  iconViewBox,
  isLoading,
  children,
  isLink = false,
  isRoundedFull,
  href,
  onClick,
  ariaLabel,
  ariaSelected,
  ariaControls,
  role,
  isDisabled = false,
  isCustomDisplayClass = false,
}: IProps) => {
  const variantClassName = getVariant(variant);
  const outerRootClassName = rootClassName ?? '';
  const displayClass = isCustomDisplayClass ? '' : styles['button--inline-block'];
  const sizeClassName = getSize(size);
  const roundedClassName = isRoundedFull ? styles['button--rounded-full'] : '';
  const loadingClassName = isLoading ? styles['button--loading'] : '';
  const className = cn(
    variantClassName,
    sizeClassName,
    roundedClassName,
    outerRootClassName,
    loadingClassName,
    displayClass,
    styles['button'],
  );
  const contentJSX = getContent(text, icon, iconWrapperClassName, iconViewBox, textClassName, wrapperContentClassName);

  const rootJSX =
    isLink && href ? (
      <a
        className={className}
        id={id}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        role={role}
        data-testid="link"
      >
        {children || contentJSX}
      </a>
    ) : (
      <button
        className={className}
        id={id}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        role={role}
        aria-selected={ariaSelected}
        aria-controls={ariaControls}
        disabled={isDisabled}
        data-testid="button"
      >
        {children || contentJSX}
      </button>
    );

  return rootJSX;
};

export { Button };
