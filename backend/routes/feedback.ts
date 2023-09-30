import express from 'express';
import { postMainHandler } from '../controllers/feedback';

const router = express.Router();

router.post('/', postMainHandler);

export { router };
