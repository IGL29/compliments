import { connection } from '~services/DBService';
import type { IProduct, IAdditionallyProduct, IPreviewProduct } from '~db/types';
import type { IAdditionallyProductsParams } from '../DBService/DBAdditionallyProductsService';
import type { IProductsParams } from '../DBService/DBProductsService';
import type { IPaginationProducts } from './types';

class ProductsService {
  static _instance: ProductsService;

  private readonly productsCountDefault = 10;

  constructor() {
    if (ProductsService._instance) {
      return ProductsService._instance;
    }
    ProductsService._instance = this;
  }

  public getProducts(params: IProductsParams) {
    return connection().queryProducts(params);
  }

  public getProduct(productId: string) {
    return connection().queryProduct(productId);
  }

  public getAdditionallyProducts(params: IAdditionallyProductsParams) {
    return connection().queryAdditionallyProducts(params);
  }

  public sortProducts(products: IPreviewProduct[], params: IProductsParams): IPreviewProduct[] {
    if (params.sort && (params.sort === 'asc' || params.sort === 'desc')) {
      return [...products].sort((a: IPreviewProduct, b: IPreviewProduct) => {
        return params.sort === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
    return products;
  }

  public getPaginationProducts<
    T extends IProduct | IAdditionallyProduct,
    U extends IProductsParams | IAdditionallyProductsParams
  >(products: T[], params: U): IPaginationProducts<T> {
    let count: number | null = null;
    let page: number | null = null;
    let pages: number | null = null;

    page = Number('page' in params ? params['page'] : 1);
    count = Number(params['count'] ? params['count'] : this.productsCountDefault);
    pages = Math.ceil(products.length / count);

    const startIndex = page * count - count;
    const endIndex = page * count;
    const data = products.slice(startIndex, endIndex);
    const countData = data.length;

    return { data, page, pages, count: countData };
  }

  public filterProduct(product: IPreviewProduct, params: IProductsParams) {
    if (!this.isMatchToParam(params.category, 'category', product)) {
      return false;
    }
    if (!this.isMatchToParam(params.subcategory, 'subcategory', product)) {
      return false;
    }
    if (!this.isMatchToParam(params.composition, 'composition', product)) {
      return false;
    }
    if (!this.isMatchToParam(params.purpose, 'purpose', product)) {
      return false;
    }
    if (!this.isMatchToParam(params.packaging, 'packaging', product)) {
      return false;
    }
    return true;
  }

  private isMatchToParam(
    params: string[] | undefined,
    key: keyof IPreviewProduct,
    product: IPreviewProduct
  ): boolean {
    if (params && params.length) {
      return params.some((param) => product[key] === param);
    }
    return true;
  }

  public getFilteredProducts(products: IPreviewProduct[], params: IProductsParams) {
    return products.filter((product: IPreviewProduct) => {
      return this.filterProduct(product, params);
    });
  }

  public getProductsWithDiscount<T extends IPreviewProduct | IAdditionallyProduct>(
    products: T[],
    userDiscount: number
  ): T[] {
    return products.map((product: IPreviewProduct | IAdditionallyProduct) => {
      return {
        ...product,
        discount: product.discount + userDiscount
      } as T;
    });
  }

  public getPreviewProducts(products: IProduct[]): IPreviewProduct[] {
    return products.map((product) => {
      return {
        ...product,
        img: product.img.preview
      };
    });
  }
}

export { ProductsService };
