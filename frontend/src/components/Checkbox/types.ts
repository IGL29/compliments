export interface IProps {
  inputId?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  cbChangeChecked?: (value: boolean) => void;
  checkboxPosition?: 'top' | 'center';
  rootClassName?: string;
  checkboxWrapperClassName?: string;
  error?: string;
  children?: JSX.Element;
  cbChangeBlur?: () => void;
}
