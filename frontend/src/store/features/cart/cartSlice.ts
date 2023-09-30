import * as reduxToolkit from '@reduxjs/toolkit';
import { Cart, ICartItem } from '~src/services/api/entities/api-cart';
import { SLICE_NAME } from './constants';
import { requestCartAsync, requestPostCartAsync, requestPatchCartAsync, requestDeleteCartAsync } from './sideEffects';

const { createSlice } = reduxToolkit;

export interface CartState {
  isLoadingCart: boolean;
  isLoadingPostCart: boolean;
  isLoadingPatchCart: boolean;
  isLoadingDeleteCart: boolean;
  errorGet: string | null;
  errorPostCart: string | null;
  errorDeleteCart: string | null;
  errorPatchCart: string | null;
  cart: Cart;
  amountPrice: number;
  discountPrice: number;
  discountWithUserPrice: number;
  countProducts: number;
}

const initialState: CartState = {
  isLoadingCart: false,
  isLoadingPostCart: false,
  isLoadingPatchCart: false,
  isLoadingDeleteCart: false,
  errorGet: null,
  errorPostCart: null,
  errorDeleteCart: null,
  errorPatchCart: null,
  cart: [],
  amountPrice: 0,
  discountPrice: 0,
  discountWithUserPrice: 0,
  countProducts: 0,
};

const cartSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCountProducts: (state, action) => {
      state.countProducts = action.payload.reduce((accum: number, cartItem: ICartItem) => accum + cartItem.count, 0);
    },
    setAmountPrice: (state, action) => {
      state.amountPrice = action.payload.reduce(
        (accum: number, cartItem: ICartItem) => accum + cartItem.product.price * cartItem.count,
        0,
      );
    },
    setDiscountPrice: (state, action) => {
      state.discountPrice = action.payload.reduce(
        (accum: number, cartItem: ICartItem) =>
          accum + ((cartItem.product.price * cartItem.product.discount) / 100) * cartItem.count,
        0,
      );
    },
    setDiscountWithUserPrice: (state, action) => {
      state.discountWithUserPrice = action.payload.data.reduce(
        (accum: number, cartItem: ICartItem) =>
          accum +
          ((cartItem.product.price * (cartItem.product.discount + action.payload.userDiscount)) / 100) * cartItem.count,
        0,
      );
    },
    resetState: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(requestCartAsync.pending, (state) => {
      state.errorGet = null;
      state.isLoadingCart = true;
    });
    builder.addCase(requestCartAsync.fulfilled, (state, action) => {
      state.isLoadingCart = false;
      state.cart = action.payload;
    });
    builder.addCase(requestCartAsync.rejected, (state, action) => {
      state.isLoadingCart = false;
      state.errorGet = action.payload || 'unknown error';
    });

    builder.addCase(requestPostCartAsync.pending, (state) => {
      state.errorPostCart = null;
      state.isLoadingPostCart = true;
    });
    builder.addCase(requestPostCartAsync.fulfilled, (state, action) => {
      state.isLoadingPostCart = false;
      state.cart = action.payload;
    });
    builder.addCase(requestPostCartAsync.rejected, (state, action) => {
      state.isLoadingPostCart = false;
      state.errorPostCart = action.payload || 'unknown error';
    });

    builder.addCase(requestPatchCartAsync.pending, (state) => {
      state.isLoadingPatchCart = true;
    });
    builder.addCase(requestPatchCartAsync.fulfilled, (state, action) => {
      state.isLoadingPatchCart = false;
      state.cart = action.payload;
    });
    builder.addCase(requestPatchCartAsync.rejected, (state, action) => {
      state.isLoadingPatchCart = false;
      state.errorPatchCart = action.payload || 'unknown error';
    });

    builder.addCase(requestDeleteCartAsync.pending, (state) => {
      state.isLoadingDeleteCart = true;
    });
    builder.addCase(requestDeleteCartAsync.fulfilled, (state, action) => {
      state.isLoadingDeleteCart = false;
      state.cart = action.payload;
    });
    builder.addCase(requestDeleteCartAsync.rejected, (state, action) => {
      state.isLoadingDeleteCart = false;
      state.errorDeleteCart = action.payload || 'unknown error';
    });
  },
});

export const { setCountProducts, setAmountPrice, setDiscountPrice, setDiscountWithUserPrice, resetState } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
