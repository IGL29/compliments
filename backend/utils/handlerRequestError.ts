import { Response } from 'express';
import { ClientError } from './ClentError';
import { TokenService } from '~services/TokenService';

const handlerRequestError = (err: unknown, res: Response) => {
  if (err instanceof new TokenService().TokenExpiredError) {
    return res.status(403).json({ message: err.message });
  }
  if (err instanceof ClientError) {
    return res.status(err.status).send({ message: err.message });
  }
  if (err instanceof Error) {
    console.error(err);
    return res.status(500).send({ message: 'Unknown error' });
  }
  return res.status(500).send({ message: 'Unknown error' });
};

export { handlerRequestError };
