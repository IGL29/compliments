import { SLICE_NAME } from './constants';
import { ApiService } from '~src/services/api';
import { PostRegisterRequestPayload } from '~src/services/api/entities/api-register/types';
import { AppDispatch, RootState } from '~src/store';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';

export const requestRegisterAsync = createAppAsyncThunk<
  void,
  PostRegisterRequestPayload,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>(`${SLICE_NAME}/requestRegisterAsync`, async (updatedData, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await new ApiService().register.postReqister(updatedData);
    return fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, rejectWithValue);
  }
});
