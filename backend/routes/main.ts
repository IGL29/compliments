import express from 'express';
import { getMainHandler } from '../controllers/main';

const router = express.Router();

router.get('/', getMainHandler);

export { router };
