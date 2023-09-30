import { DAYS_OF_WEEK } from '~src/data/daysOfWeek';
import { DeliveryMethod } from '../api/entities/api-orders/types';
import { DaysOfWeek } from '../api/entities/api-contacts/types';

class TransformDataService {
  public static toViewDeliveryMethod = (value: null | DeliveryMethod) => {
    return value !== null ? value : '';
  };
  public static toDataPhone(value: string): number | null {
    return Number(value.replace(/^(\+?7)|(\D+)/g, '').substring(0, 10)) || null;
  }
  public static toViewPhone(value: number | null | string): string {
    if (!value) {
      return '';
    }
    const stringValue = typeof value === 'number' ? String(value) : value;
    const match = stringValue.match(/^(\+?7?)(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?/);

    if (!match) {
      return '';
    }
    if (match[5]) {
      return `+7(${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    if (match[4]) {
      return `+7(${match[2]}) ${match[3]}-${match[4]}`;
    }
    if (match[3]) {
      return `+7(${match[2]}) ${match[3]}`;
    }
    if (match[2] && match[2].length === 3) {
      return `+7(${match[2]}`;
    }
    if (match[2] && match[2].length >= 1) {
      return `+7(${match[2]}`;
    }
    return '';
  }

  public static toViewDayOfWeek<T extends DaysOfWeek>(day: T): (typeof DAYS_OF_WEEK)[T] {
    return DAYS_OF_WEEK[day];
  }
}

export { TransformDataService };
