import { SLICE_NAME } from './constants';
import { ApiService } from '~src/services/api';
import { GetContactsResponsePayload } from '~src/services/api/entities/api-contacts/types';
import { AppDispatch, RootState } from '~src/store';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';

export const requestShopContacts = createAppAsyncThunk<
  GetContactsResponsePayload,
  void,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>(`${SLICE_NAME}/requestShopContacts`, async (_, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await new ApiService().shopContacts.getContacts();
    return fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, rejectWithValue);
  }
});
