import * as reduxToolkit from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import { Token } from '~src/services/api/entities/api-auth/types';
import { IUser } from '~src/services/api/entities/api-profile/types';
import {
  requestAuthAsync,
  requestProfileAsync,
  requestPatchProfileAsync,
  saveTokenFromLocalAsync,
  logoutAsync,
  requestPostSubscribeAsync,
} from './sideEffects';

const { createSlice } = reduxToolkit;

export interface ProfileState {
  token: Token | null;
  isAuth: boolean;
  isAuthLoading: boolean;
  authError: string | null;
  isProfileLoading: boolean;
  profileError: string | null;
  isLoadingPatchProfile: boolean;
  patchProfileError: string | null;
  userData: IUser | null;
  isSubscribtionLoading: boolean;
  errorSubscribtion: null | string;
}

const initialState: ProfileState = {
  isAuth: false,
  token: null,
  isAuthLoading: false,
  authError: null,
  profileError: null,
  isProfileLoading: false,
  isLoadingPatchProfile: false,
  patchProfileError: null,
  userData: null,
  isSubscribtionLoading: false,
  errorSubscribtion: null,
};

export const profileSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuth: (state) => {
      state.isAuth = true;
    },
    resetAuth: (state) => {
      state.isAuth = false;
    },
    resetErrorPatchProfile: (state) => {
      state.patchProfileError = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(requestAuthAsync.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(requestAuthAsync.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      state.token = action.payload.token;
      state.isAuth = true;
    });
    builder.addCase(requestAuthAsync.rejected, (state) => {
      state.isAuthLoading = false;
      state.isAuth = false;
    });

    builder.addCase(requestProfileAsync.pending, (state) => {
      state.isProfileLoading = true;
    });
    builder.addCase(requestProfileAsync.fulfilled, (state, action) => {
      state.isProfileLoading = false;
      state.userData = action.payload;
    });
    builder.addCase(requestProfileAsync.rejected, (state) => {
      state.isProfileLoading = false;
    });

    builder.addCase(requestPatchProfileAsync.pending, (state) => {
      state.isLoadingPatchProfile = true;
      state.patchProfileError = null;
    });
    builder.addCase(requestPatchProfileAsync.fulfilled, (state, action) => {
      state.isLoadingPatchProfile = false;
      state.userData = action.payload;
    });
    builder.addCase(requestPatchProfileAsync.rejected, (state, action) => {
      state.isLoadingPatchProfile = false;
      state.patchProfileError = action.payload || null;
    });

    builder.addCase(saveTokenFromLocalAsync.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(saveTokenFromLocalAsync.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      state.token = action.payload;
      state.isAuth = true;
    });
    builder.addCase(saveTokenFromLocalAsync.rejected, (state) => {
      state.isAuthLoading = false;
      state.isAuth = false;
    });

    builder.addCase(logoutAsync.fulfilled, () => initialState);

    builder.addCase(requestPostSubscribeAsync.pending, (state) => {
      state.errorSubscribtion = null;
      state.isSubscribtionLoading = true;
    });
    builder.addCase(requestPostSubscribeAsync.fulfilled, (state) => {
      state.isSubscribtionLoading = false;
    });
    builder.addCase(requestPostSubscribeAsync.rejected, (state, action) => {
      state.isSubscribtionLoading = false;
      state.errorSubscribtion = action.payload || null;
    });
  },
});

export const { setToken, setAuth, resetAuth, resetErrorPatchProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
