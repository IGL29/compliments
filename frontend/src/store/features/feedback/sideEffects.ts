import { SLICE_NAME } from './constants';
import { ApiService } from '~src/services/api';
import { PostFeedbackRequestPayload } from '~src/services/api/entities/api-feedback/types';
import { RootState, AppDispatch } from '~src/store';
import { createAppAsyncThunk } from '~src/store/createAppAsyncThunk';
import { thunkErrorHandler } from '~src/store/thunkErrorHandler';

export const requestPostFeedbackAsync = createAppAsyncThunk<
  void,
  PostFeedbackRequestPayload,
  {
    rejectValue: string;
    state: RootState;
    dispatch: AppDispatch;
  }
>(`${SLICE_NAME}/requestPostFeedbackAsync`, async (feedbackData, thunkApi) => {
  try {
    const response = await new ApiService().feedback.postFeedback(feedbackData);
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    return thunkErrorHandler(error, thunkApi.rejectWithValue);
  }
});
