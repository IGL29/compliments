import { IProductsParams, IPreviewProduct } from '../api/entities/api-products/types';
import { IUser } from '../api/entities/api-profile/types';

class ProductsService {
  public static getParamsForProducts = (params: Record<string, string[]>): IProductsParams => {
    const result: IProductsParams = {};

    if (('category' as keyof IProductsParams) in params) {
      result.category = params['category'] as unknown as IProductsParams['category'];
    }
    if (('composition' as keyof IProductsParams) in params) {
      result.composition = params['composition'] as unknown as IProductsParams['composition'];
    }
    if (('count' as keyof IProductsParams) in params) {
      result.count = params['count'][0] as unknown as IProductsParams['count'];
    }
    if (('packaging' as keyof IProductsParams) in params) {
      result.packaging = params['packaging'] as unknown as IProductsParams['packaging'];
    }
    if (('page' as keyof IProductsParams) in params) {
      result.page = params['page'][0] as unknown as IProductsParams['page'];
    }
    if (('purpose' as keyof IProductsParams) in params) {
      result.purpose = params['purpose'] as unknown as IProductsParams['purpose'];
    }
    if (('sort' as keyof IProductsParams) in params) {
      result.sort = params['sort'][0] as unknown as IProductsParams['sort'];
    }
    if (('subcategory' as keyof IProductsParams) in params) {
      result.subcategory = params['subcategory'] as unknown as IProductsParams['subcategory'];
    }
    return result;
  };

  public static getProductsWithDiscount(products: IPreviewProduct[], discount: IUser['discount'] = 0) {
    if (!discount) {
      return products;
    }
    return products.map((product) => ({ ...product, discount: product.discount + discount }));
  }
}

export { ProductsService };
