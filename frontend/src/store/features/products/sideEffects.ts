import { SLICE_NAME } from '../offerProducts';
import { ApiService } from '~src/services/api';
import { GetProductsResponsePayload, GetProductsRequestOptions } from '~src/services/api/entities/api-products/types';
import { RootState, AppDispatch } from '~src/store';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';

export const requestProductsAsync = createAppAsyncThunk<
  GetProductsResponsePayload,
  Pick<GetProductsRequestOptions, 'params'> | void,
  {
    rejectValue: string;
    state: RootState;
    dispatch: AppDispatch;
  }
>(`${SLICE_NAME}/requestProductsAsync`, async (options, thunkApi) => {
  const state = thunkApi.getState();
  try {
    const response = await new ApiService().products.getProducts({
      headers: { Authorization: `Bearer ${state.profile.token}` },
      params: options ? options.params : undefined,
    });
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});
