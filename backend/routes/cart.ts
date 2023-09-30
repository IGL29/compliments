import express from 'express';
import {
  deleteMainHandler,
  getMainHandler,
  patchMainHandler,
  postMainHandler,
  deleteAllHandler,
} from '../controllers/cart';
import { checkToken } from '../middlewares/check-token';

const router = express.Router();

router.get('/', checkToken, getMainHandler);
router.post('/', checkToken, postMainHandler);
router.patch('/', checkToken, patchMainHandler);
router.delete('/', checkToken, deleteMainHandler);
router.delete('/all', checkToken, deleteAllHandler);

export { router };
