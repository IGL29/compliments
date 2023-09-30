import * as reduxToolkit from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import { IPreviewProduct } from '~src/services/api/entities/api-products/types';
import { requestProductsAsync } from './sideEffects';

const { createSlice } = reduxToolkit;

export interface ProductsState {
  products: IPreviewProduct[];
  pages: number;
  page: number;
  count: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  pages: 1,
  page: 1,
  count: 0,
  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(requestProductsAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(requestProductsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
      state.count = action.payload.count;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    });
    builder.addCase(requestProductsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'unknown error';
    });
  },
});

export const productsReducer = productsSlice.reducer;
