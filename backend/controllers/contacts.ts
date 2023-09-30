import { Request, Response } from 'express';
import { ContactsService } from '~services/ContactsService';
import { handlerRequestError } from '~utils/handlerRequestError';

const getMainHandler = async (req: Request, res: Response) => {
  try {
    const contacts = await new ContactsService().get();
    res.json(contacts);
  } catch (err) {
    handlerRequestError(err, res);
  }
};

export { getMainHandler };
