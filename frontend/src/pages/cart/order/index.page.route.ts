import { redirect } from 'vite-plugin-ssr/abort';
import { ROUTES_DATA } from '~src/data/routes';
import { StoreService } from '~src/services/StoreService/StoreService';

export const guard = () => {
  if (!new StoreService().store.getState().cart.cart.length) {
    throw redirect(ROUTES_DATA.CART.url);
  }
};
