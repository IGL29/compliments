export interface IProps {
  rootClassName?: string;
  value?: number;
  cbChangeValue: (value: number) => void;
  min?: number;
  max?: number;
  delay?: number;
  id?: string;
  isDisabled?: boolean;
  isHideButtons?: boolean;
}
