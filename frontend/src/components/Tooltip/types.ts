export interface IProps {
  rootClassName?: string;
  contentClassName?: string;
  verticalPosition?: 'top' | 'bottom' | 'middle';
  horizontalPosition?: 'left' | 'right' | 'middle';
  children: JSX.Element[];
  id?: string;
}
