import { navigate } from 'vite-plugin-ssr/client/router';
import { Params } from './types';

class RouterService {
  private static instance: RouterService;

  constructor() {
    if (RouterService.instance) {
      return RouterService.instance;
    }
    RouterService.instance = this;
  }

  public navigate(url: string, keepScrollPosition = true) {
    return navigate(url, { keepScrollPosition });
  }

  public resetParams() {
    navigate(window.location.pathname);
  }

  public setParams(params: Params, keepScrollPosition = true) {
    const paramsString = this.transformParamsToString(params);
    navigate(window.location.pathname + this.getFullParamsString(paramsString), { keepScrollPosition });
  }

  public mergeParams(params: Params, existsParams: Params = {}, keepScrollPosition = true) {
    const resultParams: Params = {};

    Object.entries(existsParams).forEach(([key, value]) => {
      if (key in params) {
        return;
      }
      resultParams[key] = value;
    });

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        resultParams[key] = value;
      }
    });

    const paramsString = this.transformParamsToString(resultParams);
    navigate(window.location.pathname + this.getFullParamsString(paramsString), { keepScrollPosition });
  }

  private transformParamsToString(params: Params) {
    let result = '';

    Object.entries(params).forEach(([key, values]) => {
      values.forEach((item) => {
        const separator = result ? '&' : '';
        result += `${separator}${key}=${item}`;
      });
    });
    return result;
  }

  private getFullParamsString(params: string) {
    return params ? `?${params}` : params;
  }
}

export { RouterService };
