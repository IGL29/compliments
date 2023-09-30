export type GetContactsResponsePayload = IShopContacts;

export interface IShopContacts {
  phone: number | null;
  email: string;
  workTime: {
    time: {
      from: string;
      to: string;
    };
    day: {
      from: DaysOfWeek;
      to: DaysOfWeek;
    };
  };
}

export type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
