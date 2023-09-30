import * as reduxToolkit from '@reduxjs/toolkit';
import { requestRegisterAsync } from './sideEffects';
import { SLICE_NAME } from './constants';

export interface RegisterState {
  isLoading: boolean;
  error: null | string;
}

const { createSlice } = reduxToolkit;

const initialState: RegisterState = {
  isLoading: false,
  error: null,
};

export const registerSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(requestRegisterAsync.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(requestRegisterAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(requestRegisterAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const registerReducer = registerSlice.reducer;
