export interface IProps {
  rootClassName?: string;
  children: [JSX.Element, JSX.Element];
  isOpen: boolean;
  cbChangeIsOpen: (isOpen: boolean) => void;
}
