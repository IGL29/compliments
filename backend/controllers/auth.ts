import { Request, Response } from 'express';
import { TokenService } from '~services/TokenService';
import { AuthService } from '~services/AuthService';
import { handlerRequestError } from '~utils/handlerRequestError';

const postMainHandler = async (req: Request, res: Response) => {
  try {
    const userData = await new AuthService().check(req.body);
    return res.json(new TokenService().create(userData));
  } catch (err) {
    handlerRequestError(err, res);
  }
};

export { postMainHandler };
