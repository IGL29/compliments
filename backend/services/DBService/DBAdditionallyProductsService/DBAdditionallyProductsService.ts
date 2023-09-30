import readFile from '~utils/readFile';
import { ADDITIONALLY_PRODUCTS_PATH } from '~db/PATHS_DATA';
import { ProductsService } from '~services/ProductsService';
import { DBProductsService } from '../DBProductsService';
import type { IAdditionallyProductsParams } from './types';
import type { IAdditionallyProduct } from '~db/types/additionallyProducts';
import type { IPaginationProducts } from '~services/ProductsService/types';
import { ISavedUser } from '~db/types';

class DBAdditionallyProductsService {
  static _instance: DBAdditionallyProductsService;

  constructor() {
    if (DBAdditionallyProductsService._instance) {
      return DBAdditionallyProductsService._instance;
    }
    DBAdditionallyProductsService._instance = this;
  }

  public async queryAdditionallyProducts(
    params: IAdditionallyProductsParams
  ): Promise<IPaginationProducts<IAdditionallyProduct>> {
    const productsJSON = await readFile(ADDITIONALLY_PRODUCTS_PATH);
    const products: IAdditionallyProduct[] = JSON.parse(productsJSON);

    const filteredProducts = new ProductsService().getPaginationProducts<
      IAdditionallyProduct,
      IAdditionallyProductsParams
    >(products, params);
    return filteredProducts;
  }
}

export { DBAdditionallyProductsService };
