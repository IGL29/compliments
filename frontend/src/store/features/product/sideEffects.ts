import { ApiService } from '~src/services/api';
import { GetProductResponsePayload, GetProductRequestOptions } from '~src/services/api/entities/api-products/types';
import { RootState } from '~src/store';
import { SLICE_NAME } from './constants';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';

export const requestProductAsync = createAppAsyncThunk<
  GetProductResponsePayload,
  GetProductRequestOptions['url'],
  {
    rejectValue: string;
    state: RootState;
  }
>(`${SLICE_NAME}/requestProductAsync`, async (productId, thunkApi) => {
  const state = thunkApi.getState();
  try {
    const response = await new ApiService().products.getProduct({
      headers: { Authorization: `Bearer ${state.profile.token}` },
      url: `/${productId}`,
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});
