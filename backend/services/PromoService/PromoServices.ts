import { connection } from '~services/DBService';

class PromoServise {
  static _instance: PromoServise;

  constructor() {
    if (PromoServise._instance) {
      return PromoServise._instance;
    }
    PromoServise._instance = this;
  }

  public get() {
    return connection().queryPromo();
  }
}

export { PromoServise };
