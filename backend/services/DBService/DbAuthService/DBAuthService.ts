import { ISavedUser } from '~db/types/users';
import { getHashedPassword } from '~utils/getHashedPassword';

class DBAuthService {
  static _instance: DBAuthService;

  constructor() {
    if (DBAuthService._instance) {
      return DBAuthService._instance;
    }
    DBAuthService._instance = this;
  }

  public async queryAuth(
    email: string,
    password: string,
    cbQueryUser: (email: string) => Promise<ISavedUser | null>
  ): Promise<ISavedUser | null> {
    const foundUser = await cbQueryUser(email);
    const isCorrectlyData = !!(foundUser && foundUser.password === getHashedPassword(password));
    return isCorrectlyData ? foundUser : null;
  }
}

export { DBAuthService };
