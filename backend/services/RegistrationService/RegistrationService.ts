import { IUser, connection } from '~services/DBService';
import { ClientError } from '~utils/ClentError';
import { getHashedPassword } from '~utils/getHashedPassword';

class RegistrationService {
  static _instance: RegistrationService;

  constructor() {
    if (RegistrationService._instance) {
      return RegistrationService._instance;
    }
    RegistrationService._instance = this;
  }

  public checkData({
    email,
    username,
    password,
    phone
  }: {
    email: string;
    username: string;
    password: string;
    phone: number;
  }): void {
    const requiredFields = [];

    if (!email) {
      requiredFields.push('email');
    }
    if (!username) {
      requiredFields.push('username');
    }
    if (!password) {
      requiredFields.push('password');
    }
    if (!phone) {
      requiredFields.push('phone');
    }
    if (requiredFields.length) {
      throw new ClientError({
        status: 400,
        message: `Fields: ${requiredFields.join(', ')} is required`
      });
    }
  }

  public async register({
    email,
    username,
    password,
    phone
  }: {
    email: string;
    username: string;
    password: string;
    phone: number;
  }): Promise<void> {
    await connection().queryAddUser({
      email,
      name: username,
      password: getHashedPassword(password),
      phone
    });
  }
}

export { RegistrationService };
