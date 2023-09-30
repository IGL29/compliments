import { PROMO_PATH } from '~db/PATHS_DATA';
import readFile from '~utils/readFile';
import type { IPromo } from '~db/types/promotions';

class DBPromoService {
  static _instance: DBPromoService;

  constructor() {
    if (DBPromoService._instance) {
      return DBPromoService._instance;
    }
    DBPromoService._instance = this;
  }

  public async queryPromo(): Promise<IPromo[]> {
    const promoListJSON = await readFile(PROMO_PATH);
    const promoList = JSON.parse(promoListJSON);

    return promoList;
  }
}

export { DBPromoService };
