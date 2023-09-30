import { SLICE_NAME } from './constants';
import { ApiService } from '~src/services/api';
import { GetProductsResponsePayload, GetProductsRequestOptions } from '~src/services/api/entities/api-products/types';
import { RootState, AppDispatch } from '~src/store';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';

export const requestOfferProductsAsync = createAppAsyncThunk<
  GetProductsResponsePayload,
  GetProductsRequestOptions['params'],
  {
    rejectValue: string;
    state: RootState;
    dispatch: AppDispatch;
  }
>(`${SLICE_NAME}/requestProducts`, async (params, thunkApi) => {
  const state = thunkApi.getState();
  try {
    const response = await new ApiService().products.getProducts({
      headers: { Authorization: `Bearer ${state.profile.token}` },
      params: params,
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});
