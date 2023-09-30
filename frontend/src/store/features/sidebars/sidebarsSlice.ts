import * as reduxToolkit from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';

const { createSlice } = reduxToolkit;

export interface SidebarsState {
  isOpenBurgerMenu: boolean;
}

const initialState: SidebarsState = {
  isOpenBurgerMenu: false,
};

const sidebarsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    openBurgerMenu: (state) => {
      state.isOpenBurgerMenu = true;
    },
    closeBurgerMenu: (state) => {
      state.isOpenBurgerMenu = false;
    },
  },
});

export const { openBurgerMenu, closeBurgerMenu } = sidebarsSlice.actions;

export const sidebarsReducer = sidebarsSlice.reducer;
