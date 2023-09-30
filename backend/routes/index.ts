import express from 'express';
import { router as registrationRouter } from './register';
import { router as requisitesRouter } from './requisites';
import { router as subscribtionRouter } from './subscribtion';
import { router as productsRouter } from './products';
import { router as feedbackRouter } from './feedback';
import { router as contactsRouter } from './contacts';
import { router as profileRouter } from './profile';
import { router as orderRouter } from './order';
import { router as promoRouter } from './promo';
import { router as mainRouter } from './main';
import { router as authRouter } from './auth';
import { router as cartRouter } from './cart';

const router = express.Router();

router.use('/requisites', requisitesRouter);
router.use('/register', registrationRouter);
router.use('/subscribtion', subscribtionRouter);
router.use('/products', productsRouter);
router.use('/feedback', feedbackRouter);
router.use('/contacts', contactsRouter);
router.use('/profile', profileRouter);
router.use('/orders', orderRouter);
router.use('/promo', promoRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/', mainRouter);

export { router };
