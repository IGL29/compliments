import { IProps } from '~src/components/Forms/OrderForm/types';
import { INewOrderData } from '~src/services/api/entities/api-orders/types';

export interface IOrderData {
  name: INewOrderData['name'];
  phone: INewOrderData['phone'] | null;
  deliveryMethod: INewOrderData['deliveryMethod'] | null;
  city: INewOrderData['address']['city'];
  street: INewOrderData['address']['street'];
  house: INewOrderData['address']['house'];
  entrance: INewOrderData['address']['entrance'];
  apartment: INewOrderData['address']['apartment'];
  comment: INewOrderData['comment'];
}

export type Props = Pick<IProps, 'rootClassName'>;
