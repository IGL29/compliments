import { Request, Response } from 'express';
import { RegistrationService } from '../services/RegistrationService';
import { connection } from '~services/DBService';
import { handlerRequestError } from '~utils/handlerRequestError';
import { ClientError } from '~utils/ClentError';

const postMainHandler = async (req: Request, res: Response) => {
  try {
    new RegistrationService().checkData(req.body);
    const isUserExist = await connection().queryUserByEmail(req.body.email);
    if (isUserExist) {
      throw new ClientError({ status: 409, message: 'Email already registered' });
    }

    await new RegistrationService().register(req.body);
    return res.status(204).end();
  } catch (err) {
    handlerRequestError(err, res);
  }
};

export { postMainHandler };
