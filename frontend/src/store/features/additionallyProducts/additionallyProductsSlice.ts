import * as reduxToolkit from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import { IAdditionallyProduct } from '~src/services/api/entities/api-products/types';
import { requestAdditionallyProductsAsync } from './sideEffects';

const { createSlice } = reduxToolkit;

export interface AdditionallyProductsState {
  isLoading: boolean;
  products: IAdditionallyProduct[];
  error: string | null;
}

const initialState: AdditionallyProductsState = {
  isLoading: false,
  products: [],
  error: null,
};

const addtitionallyProductsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(requestAdditionallyProductsAsync.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(requestAdditionallyProductsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
    });
    builder.addCase(requestAdditionallyProductsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

export const addtitionallyProductsReducer = addtitionallyProductsSlice.reducer;
