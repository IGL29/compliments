export interface IProps {
  title?: string;
  text?: string;
  children: JSX.Element;
  cbCloseModal: () => unknown;
}
