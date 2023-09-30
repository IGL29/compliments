import readFile from '~utils/readFile';
import writeFile from '~utils/writeFile';
import { USERS_PATH } from '~db/PATHS_DATA';
import { generateId } from '~utils/generateId';
import type { ISavedUser, IUser } from '~db/types/users';

class DBUserService {
  static _instance: DBUserService;

  constructor() {
    if (DBUserService._instance) {
      return DBUserService._instance;
    }
    DBUserService._instance = this;
  }

  public async queryUser(
    userId: string,
    cbQueryIsSubscribe: (email: string) => Promise<boolean>
  ): Promise<ISavedUser | null> {
    const usersJSON = await readFile(USERS_PATH);
    const users = JSON.parse(usersJSON);
    const foundUser = users.find((user: IUser) => user.id === userId);
    if (foundUser) {
      const isSubscribe = await cbQueryIsSubscribe(foundUser.email);
      return { ...foundUser, isSubscribe };
    }
    return null;
  }

  public async queryAddUser(userData: Omit<IUser, 'id' | 'purchaseAmount' | 'isSubscribe'>) {
    const usersJSON = await readFile(USERS_PATH);
    const users = JSON.parse(usersJSON);
    const addressData = {
      city: '',
      street: '',
      house: '',
      entrance: '',
      apartment: ''
    };
    users.push({
      ...userData,
      id: generateId(),
      address: addressData,
      purchaseAmount: 0
    });
    return writeFile(USERS_PATH, JSON.stringify(users));
  }

  public async queryUserByEmail(email: string): Promise<ISavedUser | null> {
    const usersJSON = await readFile(USERS_PATH);
    const users = JSON.parse(usersJSON);
    const foundUser = users.find((user: IUser) => user.email === email);
    return foundUser || null;
  }

  public async queryAddPurchaseAmount(userId: string, amountPrice: number) {
    const usersJSON = await readFile(USERS_PATH);
    const users = JSON.parse(usersJSON);
    const foundUser: ISavedUser = users.find((user: IUser) => user.id === userId);
    foundUser.purchaseAmount += amountPrice;
    return writeFile(USERS_PATH, JSON.stringify(users));
  }
}

export { DBUserService };
