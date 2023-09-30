import readFile from '~utils/readFile';
import writeFile from '~utils/writeFile';
import { CARTS_PATH } from '~db/PATHS_DATA';
import type { ICartsItem, ICartItem } from '~db/types/carts';
import { ClientError } from '~utils/ClentError';

class DBCartsService {
  static _instance: DBCartsService;

  constructor() {
    if (DBCartsService._instance) {
      return DBCartsService._instance;
    }
    DBCartsService._instance = this;
  }

  public async queryClearCart(userId: string): Promise<void> {
    const cartsJSON = await readFile(CARTS_PATH);
    const carts: ICartsItem[] = JSON.parse(cartsJSON);

    let existsCartUserIndex = carts.findIndex((cart: ICartsItem) => cart.userId === userId);

    if (existsCartUserIndex !== -1) {
      carts[existsCartUserIndex] = { userId, inCart: [] };
      return writeFile(CARTS_PATH, JSON.stringify(carts));
    }
  }

  public async queryCart(userId: string) {
    const cartsJSON = await readFile(CARTS_PATH);
    const carts: ICartsItem[] = JSON.parse(cartsJSON);
    const cartUser = carts.find((cart: ICartsItem) => cart.userId === userId);

    if (cartUser) {
      return cartUser.inCart;
    }
    return [];
  }

  public async queryAddToCart(userId: string, cartItems: ICartItem[]) {
    const cartsJSON = await readFile(CARTS_PATH);
    const carts = JSON.parse(cartsJSON);

    let existsCartUserIndex = carts.findIndex((cart: ICartsItem) => cart.userId === userId);
    const cartUser: ICartsItem = carts[existsCartUserIndex] || {
      userId,
      inCart: []
    };

    let mapCartItems = new Map<ICartItem['product']['id'], ICartItem>();

    cartItems.forEach((item) => {
      mapCartItems.set(item.product.id, item);
    });

    for (let i = 0; cartUser.inCart.length > i; i++) {
      const gettedProduct = mapCartItems.get(cartUser.inCart[i].product.id);

      if (gettedProduct) {
        cartUser.inCart[i].count += gettedProduct.count;
        mapCartItems.delete(gettedProduct.product.id);

        if (mapCartItems.size === 0) {
          break;
        }
      }
    }

    for (let product of mapCartItems.values()) {
      cartUser.inCart.push(product);
    }

    if (existsCartUserIndex === -1) {
      carts.push(cartUser);
    } else {
      carts[existsCartUserIndex] = cartUser;
    }

    await writeFile(CARTS_PATH, JSON.stringify(carts));
    return cartUser.inCart;
  }

  public async queryChangeInCart(userId: string, { id, count }: { id: string; count: number }) {
    const cartsJSON = await readFile(CARTS_PATH);
    const carts: ICartsItem[] = JSON.parse(cartsJSON);

    let existsCartUserIndex = carts.findIndex((cart: ICartsItem) => cart.userId === userId);
    if (existsCartUserIndex === -1) {
      throw new ClientError({ status: 400, message: 'Cart not found' });
    }

    const cartUser = carts[existsCartUserIndex] || {
      userId,
      inCart: []
    };

    const existsProductIndex = cartUser.inCart.findIndex((inCartItem: ICartItem) => {
      return inCartItem.product.id === id;
    });

    if (existsProductIndex === -1) {
      throw new ClientError({ status: 400, message: 'Product not found in cart' });
    }

    const existsProduct = cartUser.inCart[existsProductIndex];
    cartUser.inCart[existsProductIndex] = {
      ...existsProduct,
      count
    };

    carts[existsCartUserIndex] = cartUser;

    await writeFile(CARTS_PATH, JSON.stringify(carts));
    return cartUser.inCart;
  }

  public async queryDeleteFromCart(userId: string, productId: string) {
    const cartsJSON = await readFile(CARTS_PATH);
    const carts: ICartsItem[] = JSON.parse(cartsJSON);

    let existsCartUserIndex = carts.findIndex((cart: ICartsItem) => cart.userId === userId);

    if (existsCartUserIndex === -1) {
      throw new Error('Cart not found');
    }

    const cartUser = carts[existsCartUserIndex] || {
      userId,
      inCart: []
    };
    const existsProductIndex = cartUser.inCart.findIndex((inCartItem: ICartItem) => {
      return inCartItem.product.id === productId;
    });

    if (existsProductIndex === -1) {
      throw new Error('Product not found in cart');
    }

    cartUser.inCart.splice(existsProductIndex, 1);
    await writeFile(CARTS_PATH, JSON.stringify(carts));
    return cartUser.inCart;
  }
}

export { DBCartsService };
