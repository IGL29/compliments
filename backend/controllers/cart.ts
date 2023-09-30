import { Request, Response } from 'express';
import { TokenService } from '~services/TokenService';
import { CartService } from '~services/CartsService';
import { handlerRequestError } from '~utils/handlerRequestError';

const getMainHandler = async (req: Request, res: Response) => {
  try {
    const tokenPayload = new TokenService().getPayloadFromRequest(req);
    const cart = await new CartService().get(tokenPayload?.id);
    return res.json(cart);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

const postMainHandler = async (req: Request, res: Response) => {
  try {
    const tokenPayload = new TokenService().getPayloadFromRequest(req);
    const cart = await new CartService().add(tokenPayload?.id, req.body);
    return res.send(cart);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

const patchMainHandler = async (req: Request, res: Response) => {
  try {
    const tokenPayload = new TokenService().getPayloadFromRequest(req);
    const cart = await new CartService().change(tokenPayload?.id, req.body);
    return res.send(cart);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

const deleteMainHandler = async (req: Request, res: Response) => {
  try {
    const tokenPayload = new TokenService().getPayloadFromRequest(req);
    const cart = await new CartService().delete(tokenPayload?.id, req.body.id);
    return res.send(cart);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

const deleteAllHandler = async (req: Request, res: Response) => {
  try {
    const payload = new TokenService().getPayloadFromRequest(req);
    await new CartService().clearAll(payload?.id);
    return res.end();
  } catch (error) {
    handlerRequestError(error, res);
  }
};

export { getMainHandler, postMainHandler, patchMainHandler, deleteMainHandler, deleteAllHandler };
