import { EDiscount } from 'data/discounts';
import { ISavedUser } from '~db/types';

class DiscountService {
  public static getDiscount(user: ISavedUser, isSubscribe: boolean): number {
    let discount = 0;

    if (isSubscribe) {
      discount += EDiscount.SUBSCRIBTION;
    }
    if (user.purchaseAmount >= 25000) {
      discount += EDiscount.ORDER_PRICE_25000;
    } else if (user.purchaseAmount >= 15000) {
      discount += EDiscount.ORDER_PRICE_15000;
    }
    return discount;
  }
}

export { DiscountService };
