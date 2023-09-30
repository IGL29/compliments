import { Request, Response } from 'express';
import { OrderService } from '~services/OrderService';
import { TokenService } from '~services/TokenService';
import { handlerRequestError } from '~utils/handlerRequestError';

const postMainHandler = async (req: Request, res: Response) => {
  try {
    const payload = new TokenService().getPayloadFromRequest(req, true);
    const orderData = await new OrderService().doOrder(req.body, payload?.id || null);
    return res.status(201).json(orderData);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

const getOrderHandler = async (req: Request, res: Response) => {
  try {
    if (!req.params.orderId) {
      throw new Error('Order Id not passed');
    }
    const orderData = await new OrderService().get(req.params.orderId);
    return res.json(orderData);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

const getMainHandler = async (req: Request, res: Response) => {
  try {
    const payload = new TokenService().getPayloadFromRequest(req, true);
    const userOrders = await new OrderService().getUserOrders(payload?.id);
    return res.json(userOrders);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

export { postMainHandler, getMainHandler, getOrderHandler };
