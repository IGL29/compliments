import express from 'express';
import {
  postMainHandler,
  getMainHandler,
  getOrderHandler,
} from '../controllers/order';
import { checkToken } from '../middlewares/check-token';

const router = express.Router();

router.post('/', postMainHandler);
router.get('/', checkToken, getMainHandler);
router.get('/:orderId', getOrderHandler);

export { router };
