import { SLICE_NAME } from './constants';
import { ApiService } from '~src/services/api';
import {
  GetAdditionallyResponsePayload,
  GetAdditionallyRequestOptions,
} from '~src/services/api/entities/api-products/types';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';
import { getAuthHeader } from '~src/utils/getAuthHeader';
import { RootState } from '~src/store';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';

export const requestAdditionallyProductsAsync = createAppAsyncThunk<
  GetAdditionallyResponsePayload,
  Pick<GetAdditionallyRequestOptions, 'params'> | void,
  {
    rejectValue: string;
    state: RootState;
  }
>(`${SLICE_NAME}/requestAdditionallyProducts`, async (options, thunkApi) => {
  const state = thunkApi.getState();
  try {
    const optionsData = {
      headers: getAuthHeader(state.profile.token),
      params: options ? options.params : undefined,
    };
    const response = await new ApiService().products.getAdditionallyProducts(optionsData);
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});
