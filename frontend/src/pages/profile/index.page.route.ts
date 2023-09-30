import { PageContextClient } from 'src/renderer/types';
import { resolveRoute } from 'vite-plugin-ssr/routing';
import { ROUTES_DATA } from '~src/data/routes';
import { redirect } from 'vite-plugin-ssr/abort';
import { StoreService } from '~src/services/StoreService/StoreService';

export const guard = () => {
  if (!new StoreService().store.getState().profile.isAuth) {
    throw redirect(ROUTES_DATA.MAIN.url);
  }
};

export default (pageContext: PageContextClient) => {
  {
    const result = resolveRoute('/profile', pageContext.urlPathname);
    if (result.match) {
      result.routeParams.view = 'root';
      return result;
    }
  }
  {
    const result = resolveRoute('/profile/discount', pageContext.urlPathname);
    if (result.match) {
      result.routeParams.view = 'discount';
      return result;
    }
  }
  {
    const result = resolveRoute('/profile/orders', pageContext.urlPathname);
    if (result.match) {
      result.routeParams.view = 'orders';
      return result;
    }
  }
  return false;
};
