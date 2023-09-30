import { CONTACTS_PATH } from '~db/PATHS_DATA';
import readFile from '~utils/readFile';

class DBContactsService {
  static _instance: DBContactsService;

  constructor() {
    if (DBContactsService._instance) {
      return DBContactsService._instance;
    }
    DBContactsService._instance = this;
  }

  public async queryContacts() {
    const contactsJSON = await readFile(CONTACTS_PATH);
    const contacts = JSON.parse(contactsJSON);

    return contacts;
  }
}

export { DBContactsService };
