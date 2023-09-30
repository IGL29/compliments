import { Address } from '~src/components/Address';
import { Props } from './types';
import { useAppDispatch } from '~src/hooks/useAppDispatch';
import { useEffect } from 'react';
import { requestShopContacts } from '~src/store/features/shopContacts';
import { useAppSelector } from '~src/hooks/useAppSelector';
import { SHOP_CONTACTS } from '~src/data/contacts';

const AddressContainer = ({ rootClassName }: Props) => {
  const dispatch = useAppDispatch();
  const shopContacts = useAppSelector((state) => state.shopContacts.data);

  useEffect(() => {
    if (!shopContacts) {
      dispatch(requestShopContacts());
    }
  }, []);

  const workTime = shopContacts?.workTime || SHOP_CONTACTS.workTime;
  const phone = shopContacts?.phone || SHOP_CONTACTS.phone;

  return <Address rootClassName={rootClassName} workTime={workTime} phone={phone} />;
};

export { AddressContainer };
