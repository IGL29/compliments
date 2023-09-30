import { Request, Response } from 'express';
import { TokenService } from '~services/TokenService';
import { SubscribtionService } from '~services/SubscribeService';
import { handlerRequestError } from '~utils/handlerRequestError';
import { ProfileService } from '~services/ProfileService';
import { ClientError } from '~utils/ClentError';

const postMainHandler = async (req: Request, res: Response) => {
  const tokenPayload = new TokenService().getPayloadFromRequest(req, true);

  let emailFromToken: string | null = null;

  if (tokenPayload?.id) {
    try {
      const user = await new ProfileService().get(tokenPayload?.id);

      if (user) {
        emailFromToken = user.email;
      } else {
        new ClientError({ message: 'Not Found', status: 400 });
      }
    } catch (error) {
      handlerRequestError(error, res);
    }
  }

  if (!emailFromToken && !req.body.email) {
    res.statusCode = 400;
    return res.send({ message: 'Email not transmitted' });
  }

  try {
    await new SubscribtionService().subscribe(emailFromToken || req.body.email);
    return res.status(200).end();
  } catch (error) {
    handlerRequestError(error, res);
  }
};

export { postMainHandler };

const deleteMainHandler = async (req: Request, res: Response) => {
  const tokenPayload = new TokenService().getPayloadFromRequest(req, true);

  let emailFromToken: string | null = null;

  if (tokenPayload?.id) {
    try {
      const user = await new ProfileService().get(tokenPayload?.id);

      if (user) {
        emailFromToken = user.email;
      } else {
        new ClientError({ message: 'Not Found', status: 400 });
      }
    } catch (error) {
      handlerRequestError(error, res);
    }
  }

  if (!emailFromToken && !req.body.email) {
    res.statusCode = 400;
    return res.send({ message: 'Email not transmitted' });
  }

  try {
    await new SubscribtionService().unsubscribe(emailFromToken || req.body.email);
    return res.status(200).end();
  } catch (error) {
    handlerRequestError(error, res);
  }
};

export { deleteMainHandler };
