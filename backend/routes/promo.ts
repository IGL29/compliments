import express from 'express';
import { getMainHandler } from '../controllers/promo';

const router = express.Router();

router.get('/', getMainHandler);

export { router };
