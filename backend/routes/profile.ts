import express from 'express';
import { getMainHandler, patchMainHandler } from '../controllers/profile';
import { checkToken } from '../middlewares/check-token';

const router = express.Router();

router.get('/', checkToken, getMainHandler);
router.patch('/', checkToken, patchMainHandler);

export { router };
