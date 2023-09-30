import { connection } from '~services/DBService';
import type { ICartItem } from '~db/types';
import type { IRequestOrder } from './types';
import { ClientError } from '~utils/ClentError';

class OrderService {
  static _instance: OrderService;

  constructor() {
    if (OrderService._instance) {
      return OrderService._instance;
    }
    OrderService._instance = this;
  }

  public async doOrder(orderData: IRequestOrder & { cart?: ICartItem[] }, userId?: string) {
    await this.validateRequestData(orderData, userId);
    return this.saveOrderData(orderData, userId);
  }

  private async validateRequestData(
    orderData: IRequestOrder & { cart?: ICartItem[] },
    userId?: string
  ) {
    const missedFields = this.checkRequiredFields(orderData, userId);

    if (missedFields.length) {
      throw new ClientError({ message: `Missed: ${missedFields.join(', ')}`, status: 400 });
    }
    if (!userId) {
      return;
    }
    const user = await connection().queryUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
  }

  private checkRequiredFields(
    orderData: IRequestOrder & { cart?: ICartItem[] },
    userId?: string
  ): Array<keyof IRequestOrder | 'cart'> {
    const missedFields: Array<keyof IRequestOrder | 'cart'> = [];

    if (
      !orderData.address ||
      !orderData.address.city ||
      !orderData.address.street ||
      !orderData.address.house
    ) {
      missedFields.push('address');
    }
    if (!orderData.deliveryMethod) {
      missedFields.push('deliveryMethod');
    }
    if (!orderData.name) {
      missedFields.push('name');
    }
    if (!orderData.phone) {
      missedFields.push('phone');
    }
    if (!orderData.cart && !userId) {
      missedFields.push('cart');
    }
    return missedFields;
  }

  public saveOrderData(orderData: IRequestOrder & { cart?: ICartItem[] }, userId?: string) {
    return connection().querySaveOrder(orderData, userId);
  }

  public get(orderId: string) {
    return connection().queryOrder(orderId);
  }

  public async getUserOrders(userId: string) {
    const user = await connection().queryUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return connection().queryUserOrders(user.id);
  }
}

export { OrderService };
