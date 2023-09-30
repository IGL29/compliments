import { IPromo } from '~src/services/api/entities/api-promo/types';

export interface IProps {
  promotions: IPromo[];
  rootClassName?: string;
  isLoading: boolean;
  error: string | null;
  cbRepeatRequest: () => void;
}
