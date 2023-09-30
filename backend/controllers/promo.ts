import { Request, Response } from 'express';
import { PromoServise } from '~services/PromoService';
import { handlerRequestError } from '~utils/handlerRequestError';

const getMainHandler = async (req: Request, res: Response) => {
  try {
    const promoList = await new PromoServise().get();
    res.json(promoList);
  } catch (err) {
    handlerRequestError(err, res);
  }
};

export { getMainHandler };
