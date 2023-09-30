import * as reduxToolkit from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';

const { createSlice } = reduxToolkit;

export interface CartState {
  isOpenUserAuthModal: boolean;
  isOpenUserRegisterModal: boolean;
  isOpenUserAuthSuccessModal: boolean;
  isOpenUserRegisterSuccessModal: boolean;
  isOpenSubscribtionModal: boolean;
  isOpenFiltersModal: boolean;
}

const initialState: CartState = {
  isOpenUserAuthModal: false,
  isOpenUserRegisterModal: false,
  isOpenUserAuthSuccessModal: false,
  isOpenUserRegisterSuccessModal: false,
  isOpenSubscribtionModal: false,
  isOpenFiltersModal: false,
};

export const modalsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    openUserAuthModal: (state) => {
      state.isOpenUserRegisterSuccessModal = false;
      state.isOpenUserRegisterModal = false;
      state.isOpenUserAuthModal = true;
    },
    closeUserAuthModal: (state) => {
      state.isOpenUserAuthModal = false;
    },
    openUserRegisterModal: (state) => {
      state.isOpenUserRegisterModal = true;
      state.isOpenUserAuthModal = false;
    },
    closeUserRegisterModal: (state) => {
      state.isOpenUserRegisterModal = false;
    },

    closeUserModal: (state) => {
      state.isOpenUserRegisterModal = false;
      state.isOpenUserAuthModal = false;
      state.isOpenUserAuthSuccessModal = false;
      state.isOpenUserRegisterSuccessModal = false;
    },

    openUserAuthSuccessModal: (state) => {
      state.isOpenUserAuthModal = false;
      state.isOpenUserAuthSuccessModal = true;
    },
    closeUserAuthSuccessModal: (state) => {
      state.isOpenUserAuthSuccessModal = false;
    },

    openUserRegisterSuccessModal: (state) => {
      state.isOpenUserRegisterModal = false;
      state.isOpenUserRegisterSuccessModal = true;
    },
    closeUserRegisterSuccessModal: (state) => {
      state.isOpenUserRegisterSuccessModal = false;
    },

    openSubscribtionModal: (state) => {
      state.isOpenSubscribtionModal = true;
    },
    closeSubscribtionModal: (state) => {
      state.isOpenSubscribtionModal = false;
    },

    openFiltersModal: (state) => {
      state.isOpenFiltersModal = true;
    },
    closeFiltersModal: (state) => {
      state.isOpenFiltersModal = false;
    },
  },
});

export const {
  closeUserAuthModal,
  closeUserModal,
  closeUserRegisterModal,
  openUserAuthModal,
  openUserAuthSuccessModal,
  openUserRegisterModal,
  closeUserAuthSuccessModal,
  openUserRegisterSuccessModal,
  closeUserRegisterSuccessModal,
  openSubscribtionModal,
  closeSubscribtionModal,
  openFiltersModal,
  closeFiltersModal,
} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
