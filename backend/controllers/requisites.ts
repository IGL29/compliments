import { Request, Response } from 'express';
import { RequisitesService } from '~services/RequisitesService';
import { handlerRequestError } from '~utils/handlerRequestError';

const getMainHandler = async (req: Request, res: Response) => {
  try {
    const promoList = await new RequisitesService().get();
    res.json(promoList);
  } catch (err) {
    handlerRequestError(err, res);
  }
};

export { getMainHandler };
