import { Request, Response } from 'express';
import { ProductsService } from '~services/ProductsService';
import { handlerRequestError } from '~utils/handlerRequestError';

const getMainHandler = async (req: Request, res: Response) => {
  try {
    const products = await new ProductsService().getProducts(req.query);
    res.send(products);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

const getAdditionallyHandler = async (req: Request, res: Response) => {
  try {
    const products = await new ProductsService().getAdditionallyProducts(req.query);
    res.send(products);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

const getProductHandler = async (req: Request, res: Response) => {
  try {
    const products = await new ProductsService().getProduct(req.params.productId);
    res.send(products);
  } catch (error) {
    handlerRequestError(error, res);
  }
};

export { getMainHandler, getAdditionallyHandler, getProductHandler };
