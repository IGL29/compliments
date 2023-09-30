import { Request, Response, NextFunction } from 'express';
import { TokenService } from '~services/TokenService';
import { ClientError } from '~utils/ClentError';
import { handlerRequestError } from '~utils/handlerRequestError';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = new TokenService().getTokenFromRequest(req);
    if (token) {
      new TokenService().check(token);
      return next();
    }
    throw new ClientError({ status: 401, message: 'Unauthorized' });
  } catch (error) {
    handlerRequestError(error, res);
  }
};

export { checkToken };
