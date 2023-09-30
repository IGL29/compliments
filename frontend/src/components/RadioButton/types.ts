export interface IProps<T extends string> {
  inputId?: string;
  inputName: T;
  activeInputName?: string;
  cbChangeChecked?: (inputName: T) => void;
  checkboxPosition?: 'top' | 'center';
  rootClassName?: string;
  checkboxWrapperClassName?: string;
  cbChangeBlur?: () => void;
  error?: string;
  children?: JSX.Element;
}
