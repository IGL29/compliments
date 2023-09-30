import { ISavedUser } from '~db/types';
import { connection } from '~services/DBService';
import { IUserPublic } from '~services/ProfileService';
import { ClientError } from '~utils/ClentError';

class AuthService {
  static _instance: AuthService;

  constructor() {
    if (AuthService._instance) {
      return AuthService._instance;
    }
    AuthService._instance = this;
  }

  public async check({
    email,
    password
  }: {
    email?: string;
    password?: string;
  }): Promise<Pick<ISavedUser, 'name' | 'id'>> {
    if (!email || !password) {
      throw new ClientError({ status: 400, message: 'Email and password are required' });
    }
    const userData = await connection().queryAuth(email, password);
    if (!userData) {
      throw new ClientError({ status: 422, message: 'Email or password is not correct' });
    }
    return {
      id: userData.id,
      name: userData.name
    };
  }
}

export { AuthService };
