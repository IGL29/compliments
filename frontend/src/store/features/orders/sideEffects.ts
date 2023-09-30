import { SLICE_NAME } from './constants';
import { ApiService } from '~src/services/api';
import {
  GetOrdersResponsePayload,
  GetOrderResponsePayload,
  GetOrderRequestOptions,
  PostOrderResponsePayload,
  PostOrderRequestPayload,
} from '~src/services/api/entities/api-orders/types';
import { RootState, AppDispatch } from '~src/store';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';
import { getAuthHeader } from '~src/utils/getAuthHeader';
import { resetState } from '../cart';
import { CartService } from '~src/services/CartService';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';

export const requestOrdersAsync = createAppAsyncThunk<
  GetOrdersResponsePayload,
  void,
  {
    rejectValue: string;
    state: RootState;
  }
>(`${SLICE_NAME}/requestOrdersAsync`, async (_, thunkApi) => {
  const state = thunkApi.getState();
  try {
    const response = await new ApiService().orders.getListOrders({
      headers: { Authorization: `Bearer ${state.profile.token}` },
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});

export const requestOrderAsync = createAppAsyncThunk<
  GetOrderResponsePayload,
  GetOrderRequestOptions['url'],
  {
    rejectValue: string;
    state: RootState;
    dispatch: AppDispatch;
  }
>(`${SLICE_NAME}/requestOrderAsync`, async (orderId, thunkApi) => {
  try {
    const response = await new ApiService().orders.getOrder({
      url: orderId,
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});

export const requestPostNewOrderAsync = createAppAsyncThunk<
  PostOrderResponsePayload,
  PostOrderRequestPayload,
  {
    rejectValue: string;
    state: RootState;
    dispatch: AppDispatch;
  }
>(`${SLICE_NAME}/requestPostNewOrderAsync`, async (orderData, thunkApi) => {
  const state: RootState = thunkApi.getState();

  if (!state.profile.isAuth) {
    try {
      const orderDataWithCart = { ...orderData, cart: state.cart.cart };
      const response = await new ApiService().orders.postOrder(orderDataWithCart, {
        headers: getAuthHeader(state.profile.token),
      });
      CartService.resetLocalCart();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkErrorHandler(error, thunkApi.rejectWithValue);
    }
  }

  try {
    const response = await new ApiService().orders.postOrder(orderData, {
      headers: getAuthHeader(state.profile.token),
    });
    thunkApi.dispatch(resetState());
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});
