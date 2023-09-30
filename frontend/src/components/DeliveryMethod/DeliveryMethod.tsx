import { IProps, MethodDescr } from './types';

const METHOD_DESCR: MethodDescr = {
  courier: 'Доставка курьером',
  pickup: 'Самовывоз',
  sdec: 'СДЭК',
};

const DeliveryMethod = ({ value }: IProps) => {
  return <span>{METHOD_DESCR[value]}</span>;
};

export { DeliveryMethod };
