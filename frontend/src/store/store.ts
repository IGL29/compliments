import * as reduxToolkit from '@reduxjs/toolkit';
import { shopContactsReducer, SLICE_NAME as SHOP_CONTACTS_SLICE_NAME } from './features/shopContacts';
import { offerProductsReducer, SLICE_NAME as OFFER_PRODUCTS_SLICE_NAME } from './features/offerProducts';
import { registerReducer, SLICE_NAME as REGISTER_SLICE_NAME } from './features/register';
import { sidebarsReducer, SLICE_NAME as SIDEBARS_SLICE_NAME } from './features/sidebars';
import { modalsReducer, SLICE_NAME as MODALS_SLICE_NAME } from './features/modals';
import { productsReducer, SLICE_NAME as PRODUCTS_SLICE_NAME } from './features/products';
import { productReducer, SLICE_NAME as PRODUCT_SLICE_NAME } from './features/product';
import {
  addtitionallyProductsReducer,
  SLICE_NAME as ADDITIONALLY_PRODUCTS_SLICE_NAME,
} from './features/additionallyProducts';
import { profileReducer, SLICE_NAME as PROFILE_SLICE_NAME } from './features/profile';
import { ordersReducer, SLICE_NAME as ORDERS_SLICE_NAME } from './features/orders';
import { promoReducer, SLICE_NAME as PROMO_SLICE_NAME } from './features/promo';
import { cartReducer, SLICE_NAME as CART_SLICE_NAME } from './features/cart';
import { feedbackReducer, SLICE_NAME as FEEDBACK_SLICE_NAME } from './features/feedback';

const { configureStore } = reduxToolkit;

const reducer = {
  [OFFER_PRODUCTS_SLICE_NAME]: offerProductsReducer,
  [PRODUCTS_SLICE_NAME]: productsReducer,
  [PRODUCT_SLICE_NAME]: productReducer,
  [ADDITIONALLY_PRODUCTS_SLICE_NAME]: addtitionallyProductsReducer,
  [SIDEBARS_SLICE_NAME]: sidebarsReducer,
  [MODALS_SLICE_NAME]: modalsReducer,
  [REGISTER_SLICE_NAME]: registerReducer,
  [PROFILE_SLICE_NAME]: profileReducer,
  [ORDERS_SLICE_NAME]: ordersReducer,
  [CART_SLICE_NAME]: cartReducer,
  [SHOP_CONTACTS_SLICE_NAME]: shopContactsReducer,
  [PROMO_SLICE_NAME]: promoReducer,
  [FEEDBACK_SLICE_NAME]: feedbackReducer,
};

export const createStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};

export type RootStore = ReturnType<typeof createStore>;
export type RootState = { [key in keyof typeof reducer]: ReturnType<(typeof reducer)[key]> };
export type AppDispatch = RootStore['dispatch'];
