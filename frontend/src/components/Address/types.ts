import { IShopContacts } from '~src/services/api/entities/api-contacts/types';

export interface IProps extends Omit<IShopContacts, 'workTime' | 'email'> {
  rootClassName?: string;
  workTime: IShopContacts['workTime'];
}
