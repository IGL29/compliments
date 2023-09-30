import * as reduxToolkit from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import { IPreviewProduct } from '~src/services/api/entities/api-products/types';
import { requestOfferProductsAsync } from './sideEffects';

const { createSlice } = reduxToolkit;

export interface OfferProductsState {
  products: IPreviewProduct[];
  isLoading: boolean;
  error: null | string;
}

const initialState: OfferProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

export const offerProductsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(requestOfferProductsAsync.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(requestOfferProductsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
    });
    builder.addCase(requestOfferProductsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

export const offerProductsReducer = offerProductsSlice.reducer;
