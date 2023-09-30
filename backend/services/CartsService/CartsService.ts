import { connection } from '~services/DBService';
import type { ICartItem } from '~db/types';
import { ClientError } from '~utils/ClentError';

class CartService {
  static _instance: CartService;

  constructor() {
    if (CartService._instance) {
      return CartService._instance;
    }
    CartService._instance = this;
  }

  public async get(userId: string) {
    const user = await connection().queryUser(userId);

    if (!user) {
      throw new Error('User not found');
    }
    return connection().queryCart(user.id);
  }

  public async add(userId: string, cartItems: ICartItem[]) {
    const user = await connection().queryUser(userId);

    if (!user) {
      throw new Error('User not found');
    }
    if (!Array.isArray(cartItems)) {
      throw new Error('Expected cart items as array');
    }
    return connection().queryAddToCart(user.id, cartItems);
  }

  public async change(userId: string, { id, count }: { id: string; count: number }) {
    if (!id || !count) {
      throw new ClientError({ status: 400, message: 'id and count is required' });
    }
    const user = await connection().queryUser(userId);

    if (!user) {
      throw new ClientError({ status: 400, message: 'User not found' });
    }
    return connection().queryChangeInCart(user.id, { id, count });
  }

  public async delete(userId: string, productId: string) {
    const user = await connection().queryUser(userId);

    if (!user) {
      throw new Error('User not found');
    }
    return connection().queryDeleteFromCart(user.id, productId);
  }

  public async clearAll(userId: string) {
    const user = await connection().queryUser(userId);

    if (!user) {
      throw new Error('User not found');
    }
    return connection().queryClearCart(user.id);
  }
}

export { CartService };
