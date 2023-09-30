import { IProps as ProductCardProps } from '~components/ProductCard';

export interface IProps extends Pick<ProductCardProps, 'cbAddToCart'> {
  products: ProductCardProps['productItem'][];
  rootClassName?: string;
  productsListClassName?: string;
  isLoading?: boolean;
  error?: string | null;
  cbChangeProductCount: (productItem: ProductCardProps['productItem']) => void;
  cbRepeatRequest?: () => void;
}
