import express from 'express';
import { deleteMainHandler, postMainHandler } from '../controllers/subscribtion';

const router = express.Router();

router.post('/', postMainHandler);
router.delete('/', deleteMainHandler);

export { router };
