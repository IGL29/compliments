import {
  Cart,
  DeleteCartRequestPayload,
  ICartItem,
  PatchCartRequestPayload,
  PostCartRequestPayload,
} from '../api/entities/api-cart';

class CartService {
  private static key = 'cart';

  public static validateLocalCart(cart: unknown): never | void {
    if (!Array.isArray(cart)) {
      throw new Error('Cart is not correctly');
    }
    if (cart.length) {
      cart.forEach((cartItem) => {
        if (!('count' in cartItem) || !('product' in cartItem)) {
          throw new Error('Cart is not correctly');
        }
        if (isNaN(cartItem.count)) {
          throw new Error('Cart is not correctly');
        }
        if (!cartItem.product.id) {
          throw new Error('Cart is not correctly');
        }
      });
    }
  }

  private static setCartToLocal(cart: Cart) {
    localStorage[this.key] = JSON.stringify(cart);
  }

  public static getFromLocalCart(): Cart {
    const cartJSON = localStorage.getItem(this.key);
    if (!cartJSON) {
      return [];
    }
    const cart = JSON.parse(cartJSON);
    return cart;
  }

  public static deleteFromLocalCart(payload: DeleteCartRequestPayload): Cart {
    const localCart = this.getFromLocalCart();
    const updatedCart = localCart.filter((cartItem) => cartItem.product.id !== payload.id);
    this.setCartToLocal(updatedCart);
    return updatedCart;
  }

  public static postToLocalCart(reseivedCartItems: PostCartRequestPayload): Cart {
    const localCart = this.getFromLocalCart();
    const mapReceivedCartItems = new Map<ICartItem['product']['id'], ICartItem>();

    reseivedCartItems.forEach((item) => {
      const cartProductImg = typeof item.product.img === 'object' ? item.product.img.preview : item.product.img;

      mapReceivedCartItems.set(item.product.id, {
        count: item.count,
        product: {
          ...item.product,
          img: cartProductImg,
        },
      });
    });

    const updatedLocalCart = localCart.map((cartItemFromLocal) => {
      const cartItemFromReceivedMap = mapReceivedCartItems.get(cartItemFromLocal.product.id);

      if (cartItemFromReceivedMap) {
        const updatedCartItem = {
          count: cartItemFromLocal.count + cartItemFromReceivedMap.count,
          product: cartItemFromReceivedMap.product,
        };
        mapReceivedCartItems.delete(cartItemFromLocal.product.id);
        return updatedCartItem;
      }
      return cartItemFromLocal;
    });

    if (mapReceivedCartItems.size) {
      mapReceivedCartItems.forEach((recivedCartItem) => updatedLocalCart.push(recivedCartItem));
    }
    this.setCartToLocal(updatedLocalCart);
    return updatedLocalCart;
  }

  public static patchLocalCart(payload: PatchCartRequestPayload): Cart {
    const localCart = this.getFromLocalCart();

    const updatedLocalCart = localCart.map((cartItemFromLocal) => {
      if (cartItemFromLocal.product.id === payload.id) {
        return {
          count: payload.count,
          product: cartItemFromLocal.product,
        };
      }
      return cartItemFromLocal;
    });
    this.setCartToLocal(updatedLocalCart);
    return updatedLocalCart;
  }

  public static resetLocalCart(): void {
    this.setCartToLocal([]);
  }
}

export { CartService };
