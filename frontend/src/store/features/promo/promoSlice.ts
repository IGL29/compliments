import * as reduxToolkit from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import { requestPromotionsAsync } from './sideEffects';
import { IPromo } from '~src/services/api/entities/api-promo/types';

export interface PromoState {
  promotions: IPromo[];
  isLoading: boolean;
  error: null | string;
}

const { createSlice } = reduxToolkit;

const initialState: PromoState = {
  promotions: [],
  isLoading: false,
  error: null,
};

export const promoSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setPromotions: (state, action: reduxToolkit.PayloadAction<IPromo[]>) => {
      state.promotions = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(requestPromotionsAsync.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(requestPromotionsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.promotions = action.payload;
    });
    builder.addCase(requestPromotionsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

export const { setPromotions } = promoSlice.actions;

export const promoReducer = promoSlice.reducer;
