import jwt, { TokenExpiredError } from 'jsonwebtoken';
import type { Request } from 'express';
import getTokenFromRequest from '~utils/getTokenFromRequest';
import type { IUser } from '~db/types/users';
import { ClientError } from '~utils/ClentError';

class TokenService {
  static _instance: TokenService;
  private _TokenExpiredError = TokenExpiredError;
  private secret = 'secret';
  private expiresIn = '100000s';

  constructor() {
    if (TokenService._instance) {
      return TokenService._instance;
    }
    TokenService._instance = this;
  }

  public create(userData: Pick<IUser, 'id' | 'name'>) {
    const token = jwt.sign(
      {
        id: userData.id,
        username: userData.name
      },
      this.secret,
      {
        expiresIn: this.expiresIn
      }
    );

    return { token };
  }

  public check(token: string): jwt.JwtPayload {
    try {
      const payload: string | jwt.JwtPayload = jwt.verify(token, this.secret);
      if (typeof payload === 'string') {
        throw new ClientError({ status: 403, message: 'Unauthorized' });
      }
      return payload;
    } catch (error) {
      throw new ClientError({ status: 401, message: 'Unauthorized' });
    }
  }

  public isPayload(token: jwt.JwtPayload | string): token is jwt.JwtPayload {
    return typeof token !== 'string';
  }

  public get TokenExpiredError(): typeof jwt.TokenExpiredError {
    return this._TokenExpiredError;
  }

  public getTokenFromRequest(req: Request): string | null {
    return getTokenFromRequest(req);
  }

  public getPayloadFromRequest(req: Request, skipError = false) {
    try {
      const token = new TokenService().getTokenFromRequest(req);

      if (!token) {
        throw new Error('Token not passed');
      }
      const tokenPayload = new TokenService().check(token);

      if (!new TokenService().isPayload(tokenPayload)) {
        throw new Error(tokenPayload);
      }
      return tokenPayload;
    } catch (err) {
      if (skipError) {
        return null;
      }
      if (err instanceof Error) {
        throw err;
      }
    }
  }
}

export { TokenService };
