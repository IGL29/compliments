import { Request, Response } from 'express';
import { ProfileService } from '~services/ProfileService';
import { TokenService } from '~services/TokenService';
import { handlerRequestError } from '~utils/handlerRequestError';

const getMainHandler = async (req: Request, res: Response) => {
  try {
    const payload = new TokenService().getPayloadFromRequest(req);
    const user = await new ProfileService().get(payload?.id);
    res.json(user);
  } catch (err) {
    handlerRequestError(err, res);
  }
};

const patchMainHandler = async (req: Request, res: Response) => {
  try {
    const payload = new TokenService().getPayloadFromRequest(req);
    const user = await new ProfileService().patch(payload?.id, req.body);
    res.json(user);
  } catch (err) {
    handlerRequestError(err, res);
  }
};

export { getMainHandler, patchMainHandler };
