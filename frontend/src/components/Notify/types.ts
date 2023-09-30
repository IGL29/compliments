export interface IProps {
  data: INotify;
  cbDelete: (id: string) => void;
  rootClassName?: string;
}

export interface INotify {
  id: string;
  content: JSX.Element;
  status?: 'message' | 'warn' | 'error' | 'success';
}
