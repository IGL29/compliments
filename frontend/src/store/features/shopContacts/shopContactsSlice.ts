import * as reduxToolkit from '@reduxjs/toolkit';
import { IShopContacts } from '~src/services/api/entities/api-contacts/types';
import { SLICE_NAME } from './constants';
import { requestShopContacts } from './sideEffects';

const { createSlice } = reduxToolkit;

export interface IShopContactsState {
  data: null | IShopContacts;
  isLoading: boolean;
}

const initialState: IShopContactsState = {
  data: null,
  isLoading: false,
};

export const shopContactsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(requestShopContacts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestShopContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(requestShopContacts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const shopContactsReducer = shopContactsSlice.reducer;
