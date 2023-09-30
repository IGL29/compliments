import { connection } from '~services/DBService';

class ContactsService {
  static _instance: ContactsService;

  constructor() {
    if (ContactsService._instance) {
      return ContactsService._instance;
    }
    ContactsService._instance = this;
  }

  public get() {
    return connection().queryContacts();
  }
}

export { ContactsService };
