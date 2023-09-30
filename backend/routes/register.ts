import express from 'express';
import { postMainHandler } from '../controllers/reqister';

const router = express.Router();

router.post('/', postMainHandler);

export { router };
