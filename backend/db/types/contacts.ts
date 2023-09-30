export interface IContacts {
  phone: number;
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

type DaysOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
