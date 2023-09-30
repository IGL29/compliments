import { EDiscount } from 'data/discounts';
import { USERS_PATH } from '~db/PATHS_DATA';
import { IOrder, ISavedUser } from '~db/types';
import { DiscountService } from '~services/DiscountService';
import { IUpdateUser, IUserPublic } from '~services/ProfileService';
import { ClientError } from '~utils/ClentError';
import readFile from '~utils/readFile';
import writeFile from '~utils/writeFile';

class DBProfileService {
  static _instance: DBProfileService;

  constructor() {
    if (DBProfileService._instance) {
      return DBProfileService._instance;
    }
    DBProfileService._instance = this;
  }

  public async queryProfile(
    userId: string,
    cbQueryUser: (userId: string) => Promise<ISavedUser | null>,
    cbQueryIsSubscribe: (email: string) => Promise<boolean>
  ): Promise<IUserPublic> {
    const user = await cbQueryUser(userId);
    if (!user) {
      throw new ClientError({ message: 'Not found', status: 400 });
    }
    const isSubscrube = await cbQueryIsSubscribe(user.email);
    const discount = DiscountService.getDiscount(user, isSubscrube);

    return {
      email: user.email,
      name: user.name,
      address: user.address,
      phone: user.phone,
      isSubscribe: isSubscrube,
      purchaseAmount: user.purchaseAmount,
      discount
    };
  }

  public async queryPatchProfile(
    userId: string,
    userData: IUpdateUser,
    cbQueryIsSubscribe: (email: string) => Promise<boolean>,
    cbSetSubscribtion: (value: string) => Promise<void>,
    cbResetSubscribtion: (value: string) => Promise<void>
  ): Promise<IUserPublic> {
    const usersJSON = await readFile(USERS_PATH);
    const users = await JSON.parse(usersJSON);

    const userIndex = users.findIndex((user: ISavedUser) => user.id === userId);

    if (userIndex === -1) {
      throw new ClientError({ message: 'Not found', status: 400 });
    }
    if (!userData.name) {
      throw new ClientError({ message: 'User name is empty', status: 400 });
    }
    if (!userData.email) {
      throw new ClientError({ message: 'Email is empty', status: 400 });
    }
    if (
      !userData.address ||
      !userData.address.city ||
      !userData.address.house ||
      !userData.address.street ||
      !('apartment' in userData.address) ||
      !('entrance' in userData.address)
    ) {
      throw new ClientError({ message: 'Address not correctly', status: 400 });
    }

    const isSubscribe = await cbQueryIsSubscribe(users[userIndex].email);

    if (isSubscribe && !userData.isSubscribe) {
      await cbResetSubscribtion(userData.email);
    }
    if (!isSubscribe && userData.isSubscribe) {
      await cbSetSubscribtion(userData.email);
    }
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      discount: DiscountService.getDiscount(users[userIndex], userData.isSubscribe)
    };

    await writeFile(USERS_PATH, JSON.stringify(users));
    return users[userIndex];
  }
}

export { DBProfileService };
