import { SLICE_NAME } from '../offerProducts';
import { ApiService } from '~src/services/api';
import { GetPromoResponsePayload } from '~src/services/api/entities/api-promo/types';
import { RootState, AppDispatch } from '~src/store';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';

export const requestPromotionsAsync = createAppAsyncThunk<
  GetPromoResponsePayload,
  void,
  {
    rejectValue: string;
    state: RootState;
    dispatch: AppDispatch;
  }
>(`${SLICE_NAME}/requestPromotionsAsync`, async (_, thunkApi) => {
  try {
    const response = await new ApiService().promo.getPromo();
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});
