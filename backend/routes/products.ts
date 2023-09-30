import express from 'express';
import { getMainHandler, getAdditionallyHandler, getProductHandler } from '../controllers/products';

const router = express.Router();

router.get('/', getMainHandler);
router.get('/additionally', getAdditionallyHandler);
router.get('/:productId', getProductHandler);

export { router };
