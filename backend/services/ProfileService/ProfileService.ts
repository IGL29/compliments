import { DBService } from '~services/DBService/DBService/DBService';
import { IUpdateUser, IUserPublic } from './types';
import { ClientError } from '~utils/ClentError';

class ProfileService {
  static _instance: ProfileService;

  constructor() {
    if (ProfileService._instance) {
      return ProfileService._instance;
    }
    ProfileService._instance = this;
  }

  public get(userId: string | null): Promise<IUserPublic> {
    if (!userId) {
      throw new ClientError({ message: 'Not found', status: 400 });
    }
    return new DBService().queryProfile(userId);
  }

  public patch(userId: string | null, data: IUpdateUser): Promise<IUserPublic> {
    if (!userId) {
      throw new ClientError({ message: 'Not found', status: 400 });
    }
    return new DBService().queryPatchProfile(userId, data);
  }
}

export { ProfileService };
