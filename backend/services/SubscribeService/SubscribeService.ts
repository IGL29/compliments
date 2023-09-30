import { connection } from '~services/DBService';

class SubscribtionService {
  static _instance: SubscribtionService;

  constructor() {
    if (SubscribtionService._instance) {
      return SubscribtionService._instance;
    }
    SubscribtionService._instance = this;
  }

  public subscribe(email: string) {
    return connection().querySetSubscribtion(email);
  }

  public unsubscribe(email: string) {
    return connection().queryResetSubscribtion(email);
  }

  public isSubscribe(email: string) {
    return connection().queryIsSubscribe(email);
  }
}

export { SubscribtionService };
