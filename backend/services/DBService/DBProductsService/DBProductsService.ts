import readFile from '~utils/readFile';
import { ProductsService } from '~services/ProductsService';
import { PRODUCTS_PATH } from '~db/PATHS_DATA';
import type { IAdditionallyProduct } from '~db/types/additionallyProducts';
import type { IPreviewProduct, IProduct } from '~db/types/products';
import type { IProductsParams } from './types';
import { ISavedUser } from '~db/types';
import { ClientError } from '~utils/ClentError';
import { DiscountService } from '~services/DiscountService';

class DBProductsService {
  static _instance: DBProductsService;

  constructor() {
    if (DBProductsService._instance) {
      return DBProductsService._instance;
    }
    DBProductsService._instance = this;
  }

  public async queryProducts(params: IProductsParams) {
    const productsJSON = await readFile(PRODUCTS_PATH);
    const products: IProduct[] = JSON.parse(productsJSON);

    const previewProducts = new ProductsService().getPreviewProducts(products);
    const sortedProducts = new ProductsService().sortProducts(previewProducts, params);
    const filteredProducts = new ProductsService().getFilteredProducts(sortedProducts, params);

    return new ProductsService().getPaginationProducts(filteredProducts, params);
  }

  public async queryProduct(productId: string) {
    const productsJSON = await readFile(PRODUCTS_PATH);
    const products: IProduct[] = JSON.parse(productsJSON);

    const product = products.find((product) => product.id === productId);

    if (!product) {
      throw new ClientError({ message: 'Not found', status: 404 });
    }
    return product;
  }

  public async getProductsWithDiscount<T extends IPreviewProduct | IAdditionallyProduct>(
    products: T[],
    userId: null | string,
    cbQueryUser: (userId: string) => Promise<ISavedUser | null>
  ): Promise<T[]> {
    if (!userId) {
      return products;
    }
    const user = await cbQueryUser(userId);
    if (!user) {
      return products;
    }
    const userDiscount = DiscountService.getDiscount(user, user.isSubscribe);
    if (userDiscount) {
      return new ProductsService().getProductsWithDiscount(products, userDiscount);
    }
    return products;
  }
}

export { DBProductsService };
