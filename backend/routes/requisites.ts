import express from 'express';
import { getMainHandler } from '../controllers/requisites';

const router = express.Router();

router.get('/', getMainHandler);

export { router };
