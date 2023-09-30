import { SLICE_NAME } from './constants';
import { ApiService } from '~src/services/api';
import { IAuthData, PostAuthRequestPayload, PostAuthResponsePayload } from '~src/services/api/entities/api-auth/types';
import {
  GetProfileResponsePayload,
  PatchProfileResponsePayload,
  PatchProfileRequestPayload,
} from '~src/services/api/entities/api-profile/types';
import { TokenService } from '~src/services/TokenService';
import { AppDispatch, RootState } from '~src/store';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';
import { resetState as resetCartState } from '../cart';
import { resetState as resetOrdersState } from '../orders';
import {
  PostSubscribtionRequestPayload,
  PostSubscribtionResponsePayload,
} from '~src/services/api/entities/api-subscribtion/types';
import { AxiosError } from 'axios';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';

export const requestAuthAsync = createAppAsyncThunk<
  PostAuthResponsePayload,
  PostAuthRequestPayload,
  { dispatch: AppDispatch; state: RootState }
>(`${SLICE_NAME}/requestAuthAsync`, async (authData: IAuthData) => {
  const response = await new ApiService().auth.postAuth(authData);
  TokenService.setToken(response.data.token);
  return response.data;
});

export const logoutAsync = createAppAsyncThunk(`${SLICE_NAME}/logoutAsync`, async (_, thunkApi) => {
  TokenService.removeToken();
  thunkApi.dispatch(resetCartState());
  thunkApi.dispatch(resetOrdersState());
  return;
});

export const saveTokenFromLocalAsync = createAppAsyncThunk(
  `${SLICE_NAME}/saveTokenFromLocalAsync`,
  async (_, thunkApi) => {
    const tokenFromLocal = TokenService.getToken();
    if (tokenFromLocal) {
      return thunkApi.fulfillWithValue(tokenFromLocal);
    }
    return thunkApi.rejectWithValue('Token is not been saved locally');
  },
);

export const requestProfileAsync = createAppAsyncThunk<GetProfileResponsePayload, void>(
  `${SLICE_NAME}/requestProfileAsync`,
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    const state = getState();
    try {
      const response = await new ApiService().profile.getProfile({
        headers: { Authorization: `Bearer ${state.profile.token}` },
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      return thunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const requestPatchProfileAsync = createAppAsyncThunk<PatchProfileResponsePayload, PatchProfileRequestPayload>(
  `${SLICE_NAME}/requestPatchProfileAsync`,
  async (updatedData, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    const state = getState();
    try {
      const response = await new ApiService().profile.patchProfile(updatedData, {
        headers: { Authorization: `Bearer ${state.profile.token}` },
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      if (error instanceof AxiosError && state.profile.isAuth && (error.response?.status === 403 || error.response?.status === 401) && error.response?.data?.message) {
        dispatch(logoutAsync());
        return rejectWithValue(error.response.data.message);
      }
      return thunkErrorHandler(error, rejectWithValue);
    }
  },
);

export const requestPostSubscribeAsync = createAppAsyncThunk<
  PostSubscribtionResponsePayload,
  PostSubscribtionRequestPayload
>(
  `${SLICE_NAME}/requestPostSubscribeAsync`,
  async (subscribtionData, { getState, rejectWithValue, fulfillWithValue }) => {
    const state = getState();
    try {
      const response = await new ApiService().subscribtion.postSubscribtion(subscribtionData, {
        headers: { Authorization: `Bearer ${state.profile.token}` },
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return rejectWithValue('Вы уже подписаны на рассылку');
      }
      return thunkErrorHandler(error, rejectWithValue);
    }
  },
);
