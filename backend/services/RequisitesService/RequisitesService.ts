import { connection } from '~services/DBService';

class RequisitesService {
  static _instance: RequisitesService;

  constructor() {
    if (RequisitesService._instance) {
      return RequisitesService._instance;
    }
    RequisitesService._instance = this;
  }

  public get() {
    return connection().queryRequisites();
  }
}

export { RequisitesService };
