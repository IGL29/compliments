import { IProps } from '~src/components/PromoList/types';
import { IPromo } from '~src/services/api/entities/api-promo/types';

export type Props = Pick<IProps, 'rootClassName'>;

export interface IPageProps {
  promotions?: {
    data?: IPromo[];
  };
}
