import { DBAdditionallyProductsService } from '../DBAdditionallyProductsService';
import { DBAuthService } from '../DbAuthService/DBAuthService';
import { DBCartsService } from '../DBCartsService/DBCartsService';
import { DBContactsService } from '../DBContactsService/DBContactsService';
import { DBOrdersService } from '../DBOrdersService/DBOrdersService';
import { DBProductsService } from '../DBProductsService/DBProductsService';
import { DBPromoService } from '../DBPromoService/DBPromoService';
import { DBRequisitesService } from '../DBRequisitesService/DBRequisitesService';
import { DBSubscribtionService } from '../DBSubscribtionsService/DBSubscribtionService';
import { DBUserService } from '../DBUserService/DBUserService';
import type { IAdditionallyProductsParams } from '../DBAdditionallyProductsService';
import type { IRequestOrder } from '~services/OrderService';
import { DBProfileService, type IProductsParams } from '~services/DBService';
import type {
  IContacts,
  IRequisites,
  IPromo,
  IAdditionallyProduct,
  IUser,
  ICartItem,
  IOrder,
  ISavedOrder,
  ISavedUser
} from '~db/types';
import { IPaginationProducts } from '~services/ProductsService/types';
import { IUpdateUser, IUserPublic } from '~services/ProfileService';

class DBService {
  static _instance: DBService;

  constructor() {
    if (DBService._instance) {
      return DBService._instance;
    }
    DBService._instance = this;
  }

  public async queryAuth(email: string, password: string): Promise<ISavedUser | null> {
    return new DBAuthService().queryAuth(email, password, this.queryUserByEmail.bind(this));
  }

  public async queryRequisites(): Promise<IRequisites> {
    return new DBRequisitesService().queryRequisites();
  }

  public async queryContacts(): Promise<IContacts> {
    return new DBContactsService().queryContacts();
  }

  public async querySaveOrder(
    orderData: IRequestOrder & { cart?: ICartItem[] },
    userId?: string
  ): Promise<ISavedOrder> {
    return new DBOrdersService().querySaveOrder(
      orderData,
      this.queryClearCart.bind(this),
      this.queryCart.bind(this),
      this.queryAddPurchaseAmount.bind(this),
      this.queryUser.bind(this),
      userId
    );
  }

  public async queryClearCart(userId: string): Promise<void> {
    return new DBCartsService().queryClearCart(userId);
  }

  public async queryOrder(orderId: string): Promise<IOrder> {
    return new DBOrdersService().queryOrder(orderId);
  }

  public async queryUserOrders(userId: string): Promise<IOrder[]> {
    return new DBOrdersService().queryUserOrders(userId);
  }

  public async queryUser(userId: string): Promise<ISavedUser | null> {
    return new DBUserService().queryUser(userId, this.queryIsSubscribe.bind(this));
  }

  public async queryUserByEmail(email: string): Promise<ISavedUser | null> {
    return new DBUserService().queryUserByEmail(email);
  }

  public async queryAddUser(userData: Omit<IUser, 'id' | 'isSubscribe'>): Promise<void> {
    return new DBUserService().queryAddUser(userData);
  }

  public async queryProfile(userId: string): Promise<IUserPublic> {
    return new DBProfileService().queryProfile(
      userId,
      this.queryUser.bind(this),
      this.queryIsSubscribe.bind(this)
    );
  }

  public async queryPatchProfile(userId: string, userData: IUpdateUser): Promise<IUserPublic> {
    return new DBProfileService().queryPatchProfile(
      userId,
      userData,
      this.queryIsSubscribe.bind(this),
      this.querySetSubscribtion.bind(this),
      this.queryResetSubscribtion.bind(this)
    );
  }

  public async queryAddPurchaseAmount(userId: string, amountPrice: number): Promise<void> {
    return new DBUserService().queryAddPurchaseAmount(userId, amountPrice);
  }

  public async querySetSubscribtion(email: string): Promise<void> {
    return new DBSubscribtionService().querySubscribe(email);
  }

  public async queryResetSubscribtion(email: string): Promise<void> {
    return new DBSubscribtionService().queryUnsubscribe(email);
  }

  public async queryIsSubscribe(email: string): Promise<boolean> {
    return new DBSubscribtionService().queryIsSubscribe(email);
  }

  public async queryPromo(): Promise<IPromo[]> {
    return new DBPromoService().queryPromo();
  }

  public async queryAdditionallyProducts(
    params: IAdditionallyProductsParams
  ): Promise<IPaginationProducts<IAdditionallyProduct>> {
    return new DBAdditionallyProductsService().queryAdditionallyProducts(params);
  }

  public async queryProducts(params: IProductsParams) {
    return new DBProductsService().queryProducts(params);
  }

  public async queryProduct(productId: string) {
    return new DBProductsService().queryProduct(productId);
  }

  public async queryCart(userId: string): Promise<ICartItem[]> {
    return new DBCartsService().queryCart(userId);
  }

  public async queryAddToCart(userId: string, cartItems: ICartItem[]): Promise<ICartItem[]> {
    return new DBCartsService().queryAddToCart(userId, cartItems);
  }

  public async queryChangeInCart(
    userId: string,
    { id, count }: { id: string; count: number }
  ): Promise<ICartItem[]> {
    return new DBCartsService().queryChangeInCart(userId, { id, count });
  }

  public async queryDeleteFromCart(userId: string, productId: string): Promise<ICartItem[]> {
    return new DBCartsService().queryDeleteFromCart(userId, productId);
  }
}

export { DBService };
