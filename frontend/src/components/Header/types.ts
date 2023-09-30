import { IUser } from '~src/services/api/entities/api-profile/types';

export interface IProps {
  rootClassName?: string;
  cbOpenBurgerMenu: () => void;
  cbOpenAuthModal: () => void;
  cartCount: number;
  userName?: IUser['name'];
}
