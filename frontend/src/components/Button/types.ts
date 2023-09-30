import type { AriaRole, MouseEvent } from 'react';
import type { TIcon } from '../icons/Icon';
import type { sizeClassNames, variantClassNames } from './data';

export interface IProps {
  variant?: Variant;
  size?: Size;
  text?: string;
  icon?: TIcon;
  id?: string;
  type?: HTMLButtonElement['type'];
  rootClassName?: string;
  wrapperContentClassName?: string;
  textClassName?: string;
  iconWrapperClassName?: string;
  iconViewBox?: string;
  children?: JSX.Element;
  isLink?: boolean;
  isRoundedFull?: boolean;
  isLoading?: boolean;
  href?: string;
  ariaLabel?: string;
  role?: AriaRole;
  ariaSelected?: boolean;
  ariaControls?: string;
  onClick?: (ev: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  isDisabled?: boolean;
  isCustomDisplayClass?: boolean;
}

export type Variant = keyof typeof variantClassNames;
export type Size = keyof typeof sizeClassNames;
