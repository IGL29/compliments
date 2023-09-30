import { REQUISITES_PATH } from '~db/PATHS_DATA';
import readFile from '~utils/readFile';

class DBRequisitesService {
  static _instance: DBRequisitesService;

  constructor() {
    if (DBRequisitesService._instance) {
      return DBRequisitesService._instance;
    }
    DBRequisitesService._instance = this;
  }

  public async queryRequisites() {
    const requisitesJSON = await readFile(REQUISITES_PATH);
    const requisites = JSON.parse(requisitesJSON);

    return requisites;
  }
}

export { DBRequisitesService };
