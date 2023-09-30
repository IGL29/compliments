import { INotify } from '../Notify/types';

export interface IProps {
  data: INotify[];
  cbDeleteNotify: (id: string) => void;
  cbDeleteAllNotify: () => void;
}
