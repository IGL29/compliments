import * as reduxToolkit from '@reduxjs/toolkit';
import { requestPostFeedbackAsync } from './sideEffects';
import { SLICE_NAME } from './constants';

const { createSlice } = reduxToolkit;

export interface FeedbackState {
  isLoading: boolean;
  error: null | string;
}

const initialState: FeedbackState = {
  isLoading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(requestPostFeedbackAsync.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(requestPostFeedbackAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(requestPostFeedbackAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

export const feedbackReducer = feedbackSlice.reducer;
