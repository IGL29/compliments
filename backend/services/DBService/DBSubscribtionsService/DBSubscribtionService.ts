import { SUBSCRIPTIONS_PATH } from '~db/PATHS_DATA';
import { generateId } from '~utils/generateId';
import readFile from '~utils/readFile';
import writeFile from '~utils/writeFile';
import type { ISubscription } from '~db/types/subscribtions';
import { ClientError } from '~utils/ClentError';

class DBSubscribtionService {
  static _instance: DBSubscribtionService;

  constructor() {
    if (DBSubscribtionService._instance) {
      return DBSubscribtionService._instance;
    }
    DBSubscribtionService._instance = this;
  }

  public async querySubscribe(email: string): Promise<void> {
    const subscribtionsJSON = await readFile(SUBSCRIPTIONS_PATH);
    const subscribtions = JSON.parse(subscribtionsJSON);
    const subscribtionIndex: number = subscribtions.findIndex(
      (subscriptionData: ISubscription) => subscriptionData.email === email
    );

    if (subscribtionIndex === -1) {
      const updatedSubscriptions = [
        ...subscribtions,
        { isSubscribe: true, email, id: generateId() }
      ];
      return writeFile(SUBSCRIPTIONS_PATH, JSON.stringify(updatedSubscriptions));
    }

    if (subscribtions[subscribtionIndex].isSubscribe) {
      throw new ClientError({ status: 409, message: 'Already have a subscription' });
    }

    subscribtions[subscribtionIndex].isSubscribe = true;
    return writeFile(SUBSCRIPTIONS_PATH, JSON.stringify(subscribtions));
  }

  public async queryUnsubscribe(email: string): Promise<void> {
    const subscribtionsJSON = await readFile(SUBSCRIPTIONS_PATH);
    const subscribtions = JSON.parse(subscribtionsJSON);
    const subscribtionIndex: number = subscribtions.findIndex(
      (subscriptionData: ISubscription) => subscriptionData.email === email
    );

    if (subscribtionIndex === -1 || !subscribtions[subscribtionIndex]?.isSubscribe) {
      throw new ClientError({ status: 409, message: 'Email has already been unsubscribed' });
    }

    subscribtions[subscribtionIndex].isSubscribe = false;
    return writeFile(SUBSCRIPTIONS_PATH, JSON.stringify(subscribtions));
  }

  public async queryIsSubscribe(email: string): Promise<boolean> {
    const subscribtionsJSON = await readFile(SUBSCRIPTIONS_PATH);
    const subscribtions = JSON.parse(subscribtionsJSON);
    const subscribtionIndex: number = subscribtions.findIndex(
      (subscriptionData: ISubscription) => subscriptionData.email === email
    );

    return subscribtionIndex !== -1 && subscribtions[subscribtionIndex]?.isSubscribe;
  }
}

export { DBSubscribtionService };
