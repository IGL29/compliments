import * as reduxToolkit from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import { IProduct } from '~src/services/api/entities/api-products/types';
import { requestProductAsync } from './sideEffects';

const { createSlice } = reduxToolkit;

export interface ProductState {
  product: null | IProduct;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(requestProductAsync.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(requestProductAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(requestProductAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

export const productReducer = productSlice.reducer;
