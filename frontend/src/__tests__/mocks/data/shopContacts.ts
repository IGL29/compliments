import { GetContactsResponsePayload } from '~src/services/api/entities/api-contacts/types';

const getMockShopContacts = ({
  email = 'example@email.com',
  phone = 9549549595,
  workTime = { day: { from: 'monday', to: 'friday' }, time: { from: '8:00', to: '20:00' } },
}: Partial<GetContactsResponsePayload> = {}): GetContactsResponsePayload => {
  return {
    email,
    phone,
    workTime,
  };
};

export { getMockShopContacts };
