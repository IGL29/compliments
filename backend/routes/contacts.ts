import express from 'express';
import { getMainHandler } from '../controllers/contacts';

const router = express.Router();

router.get('/', getMainHandler);

export { router };
