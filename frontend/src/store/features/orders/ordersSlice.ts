import * as reduxToolkit from '@reduxjs/toolkit';
import { IOrder } from '~src/services/api/entities/api-orders/types';
import { SLICE_NAME } from './constants';
import { requestOrdersAsync, requestOrderAsync, requestPostNewOrderAsync } from './sideEffects';

const { createSlice } = reduxToolkit;

export interface OrdersState {
  isLoadingOrders: boolean;
  errorLoadingOrders: string | null;
  isLoadingOrder: boolean;
  errorLoadingOrder: null | string;
  isLoadingPostOrder: boolean;
  errorPostOrder?: null | string;
  orders: IOrder[];
  order: IOrder | null;
  orderId: IOrder['id'] | null;
}

const initialState: OrdersState = {
  isLoadingOrders: false,
  errorLoadingOrders: null,
  isLoadingOrder: false,
  errorLoadingOrder: null,
  isLoadingPostOrder: false,
  orders: [],
  order: null,
  orderId: null,
};

export const ordersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(requestOrdersAsync.pending, (state) => {
      state.errorLoadingOrders = null;
      state.isLoadingOrders = true;
    });
    builder.addCase(requestOrdersAsync.fulfilled, (state, action) => {
      state.isLoadingOrders = false;
      state.orders = action.payload;
    });
    builder.addCase(requestOrdersAsync.rejected, (state, action) => {
      state.errorLoadingOrders = action.payload || 'Unknown error';
      state.isLoadingOrders = false;
    });

    builder.addCase(requestOrderAsync.pending, (state) => {
      state.errorLoadingOrder = null;
      state.isLoadingOrder = true;
    });
    builder.addCase(requestOrderAsync.fulfilled, (state, action) => {
      state.isLoadingOrder = false;
      state.order = action.payload;
    });
    builder.addCase(requestOrderAsync.rejected, (state, action) => {
      state.errorLoadingOrder = action.payload || 'Unknown error';
      state.isLoadingOrder = false;
    });

    builder.addCase(requestPostNewOrderAsync.pending, (state) => {
      state.errorPostOrder = null;
      state.isLoadingPostOrder = true;
    });
    builder.addCase(requestPostNewOrderAsync.fulfilled, (state, action) => {
      state.isLoadingPostOrder = false;
      state.order = action.payload;
    });
    builder.addCase(requestPostNewOrderAsync.rejected, (state, action) => {
      state.errorPostOrder = action.payload || 'Unknown error';
      state.isLoadingPostOrder = false;
    });
  },
});

export const { setOrderId, resetState } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
