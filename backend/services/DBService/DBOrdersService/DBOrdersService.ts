import { ORDERS_PATH } from '~db/PATHS_DATA';
import { generateId } from '~utils/generateId';
import readFile from '~utils/readFile';
import writeFile from '~utils/writeFile';
import { IRequestOrder } from '~services/OrderService';
import type { ICartItem } from '~db/types/carts';
import type { IOrder, ISavedOrder } from '~db/types/orders';
import type { ISavedUser, IUser } from '~db/types/users';
import { ClientError } from '~utils/ClentError';

class DBOrdersService {
  static _instance: DBOrdersService;

  constructor() {
    if (DBOrdersService._instance) {
      return DBOrdersService._instance;
    }
    DBOrdersService._instance = this;
  }

  public async querySaveOrder(
    orderData: IRequestOrder & { cart?: ICartItem[] },
    cbQueryClearCart: (userId: string) => Promise<void>,
    cbQueryCart: (userId: string) => Promise<ICartItem[]>,
    cbQueryAddPurchaseAmount: (userId: string, amount: number) => Promise<void>,
    cbQueryUser?: (userId: string) => Promise<ISavedUser | null>,
    userId?: string
  ): Promise<ISavedOrder> {
    const ordersJSON = await readFile(ORDERS_PATH);
    const orders = JSON.parse(ordersJSON);
    let user = null;

    if (userId && cbQueryUser) {
      user = await cbQueryUser(userId);
    }
    const newUserOrder = await this.createUserOrder(user, orders, orderData, cbQueryCart);
    const updatedOrders = [newUserOrder, ...orders];
    await writeFile(ORDERS_PATH, JSON.stringify(updatedOrders));

    if (user) {
      const purchaseAmountNewOrder = newUserOrder.cart.reduce(
        (accum, cartItem) => cartItem.count * cartItem.product.price + accum,
        0
      );
      await cbQueryClearCart(user.id);
      await cbQueryAddPurchaseAmount(user.id, purchaseAmountNewOrder);
    }

    return {
      id: newUserOrder.id,
      address: newUserOrder.address,
      cart: newUserOrder.cart,
      comment: newUserOrder.comment,
      deliveryMethod: newUserOrder.deliveryMethod,
      number: newUserOrder.number,
      phone: newUserOrder.phone,
      status: newUserOrder.status,
      date: newUserOrder.date
    };
  }

  public async queryOrder(orderId: string): Promise<IOrder> {
    const ordersJSON = await readFile(ORDERS_PATH);
    const orders = JSON.parse(ordersJSON);

    const findedOrder = orders.find((order: IOrder) => order.id === orderId);

    if (!findedOrder) {
      throw new ClientError({ message: 'Order is not found', status: 400 });
    }
    return findedOrder;
  }

  public async queryUserOrders(userId: string) {
    const ordersJSON = await readFile(ORDERS_PATH);
    const orders = JSON.parse(ordersJSON);

    const findedOrders = orders.filter((order: IOrder) => order.userId === userId);
    return findedOrders;
  }

  private async createUserOrder(
    user: null | IUser,
    orders: IOrder[],
    orderData: IRequestOrder & { cart?: ICartItem[] },
    cbQueryCart: (userId: string) => Promise<ICartItem[]>
  ): Promise<ISavedOrder> {
    const sharedFields: Pick<IOrder, 'id' | 'status' | 'number' | 'date'> = {
      id: generateId(),
      status: 'pending',
      number: orders.length + 1,
      date: new Date()
    };

    if (user === null) {
      return {
        ...(<IRequestOrder & { cart: ICartItem[] }>orderData),
        ...sharedFields
      };
    }
    const userCart = await cbQueryCart(user.id);

    if (!userCart.length) {
      throw new Error('Cart of user is empty');
    }
    return {
      ...orderData,
      ...sharedFields,
      userId: user.id,
      cart: userCart
    };
  }
}

export { DBOrdersService };
