import { SLICE_NAME } from './constants';
import { ApiService } from '~src/services/api';
import {
  GetCartResponsePayload,
  DeleteCartRequestPayload,
  PostCartResponsePayload,
  PostCartRequestPayload,
  PatchCartResponsePayload,
  PatchCartRequestPayload,
} from '~src/services/api/entities/api-cart';
import { RootState } from '~src/store';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';
import { setAmountPrice, setCountProducts, setDiscountPrice, setDiscountWithUserPrice } from '.';
import { CartService } from '~src/services/CartService';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';

export const requestCartAsync = createAppAsyncThunk<
  GetCartResponsePayload,
  void,
  { rejectValue: string; state: RootState }
>(`${SLICE_NAME}/requestCart`, async (_, thunkApi) => {
  const state = thunkApi.getState();

  if (!state.profile.isAuth) {
    try {
      const updatedLocalCart = CartService.getFromLocalCart();
      thunkApi.dispatch(setAmountPrice(updatedLocalCart));
      thunkApi.dispatch(setDiscountPrice(updatedLocalCart));
      thunkApi.dispatch(setCountProducts(updatedLocalCart));
      return thunkApi.fulfillWithValue(updatedLocalCart);
    } catch (error) {
      return thunkErrorHandler(error, thunkApi.rejectWithValue);
    }
  }
  try {
    const response = await new ApiService().cart.getCart({
      headers: { Authorization: `Bearer ${state.profile.token}` },
    });
    const userDiscount = thunkApi.getState().profile.userData?.discount;
    thunkApi.dispatch(setAmountPrice(response.data));
    thunkApi.dispatch(setDiscountPrice(response.data));
    thunkApi.dispatch(setCountProducts(response.data));
    thunkApi.dispatch(setDiscountWithUserPrice({ data: response.data, userDiscount }));
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});

export const requestDeleteCartAsync = createAppAsyncThunk<
  GetCartResponsePayload,
  DeleteCartRequestPayload,
  {
    state: RootState;
    rejectValue: string;
  }
>(`${SLICE_NAME}/requestDeleteCartAsync`, async (data, thunkApi) => {
  const state = thunkApi.getState();

  if (!state.profile.isAuth) {
    try {
      const updatedLocalCart = CartService.deleteFromLocalCart(data);
      thunkApi.dispatch(setAmountPrice(updatedLocalCart));
      thunkApi.dispatch(setDiscountPrice(updatedLocalCart));
      thunkApi.dispatch(setCountProducts(updatedLocalCart));
      return thunkApi.fulfillWithValue(updatedLocalCart);
    } catch (error) {
      return thunkErrorHandler(error, thunkApi.rejectWithValue);
    }
  }

  try {
    const response = await new ApiService().cart.deleteCart({
      headers: { Authorization: `Bearer ${state.profile.token}` },
      data,
    });
    thunkApi.dispatch(setAmountPrice(response.data));
    thunkApi.dispatch(setDiscountPrice(response.data));
    thunkApi.dispatch(setCountProducts(response.data));
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});

export const requestPostCartAsync = createAppAsyncThunk<
  PostCartResponsePayload,
  PostCartRequestPayload,
  {
    state: RootState;
    rejectValue: string;
  }
>(`${SLICE_NAME}/requestPostCartAsync`, async (data, thunkApi) => {
  const state: RootState = thunkApi.getState();

  if (!state.profile.isAuth) {
    try {
      const updatedLocalCart = CartService.postToLocalCart(data);
      thunkApi.dispatch(setAmountPrice(updatedLocalCart));
      thunkApi.dispatch(setDiscountPrice(updatedLocalCart));
      thunkApi.dispatch(setCountProducts(updatedLocalCart));
      return thunkApi.fulfillWithValue(updatedLocalCart);
    } catch (error) {
      return thunkErrorHandler(error, thunkApi.rejectWithValue);
    }
  }
  try {
    const response = await new ApiService().cart.postCart(data, {
      headers: { Authorization: `Bearer ${state.profile.token}` },
    });
    thunkApi.dispatch(setAmountPrice(response.data));
    thunkApi.dispatch(setDiscountPrice(response.data));
    thunkApi.dispatch(setCountProducts(response.data));
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});

export const requestPatchCartAsync = createAppAsyncThunk<
  PatchCartResponsePayload,
  PatchCartRequestPayload,
  {
    state: RootState;
    rejectValue: string;
  }
>(`${SLICE_NAME}/requestPatchCartAsync`, async (data, thunkApi) => {
  const state = thunkApi.getState();

  if (!state.profile.isAuth) {
    try {
      const updatedLocalCart = CartService.patchLocalCart(data);
      thunkApi.dispatch(setAmountPrice(updatedLocalCart));
      thunkApi.dispatch(setDiscountPrice(updatedLocalCart));
      thunkApi.dispatch(setCountProducts(updatedLocalCart));
      return thunkApi.fulfillWithValue(updatedLocalCart);
    } catch (error) {
      return thunkErrorHandler(error, thunkApi.rejectWithValue);
    }
  }

  try {
    const response = await new ApiService().cart.patchCart(data, {
      headers: { Authorization: `Bearer ${state.profile.token}` },
    });
    thunkApi.dispatch(setAmountPrice(response.data));
    thunkApi.dispatch(setDiscountPrice(response.data));
    thunkApi.dispatch(setCountProducts(response.data));
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});
