import { AxiosError } from 'axios';

export const thunkErrorHandler = <T extends (arg: string) => ReturnType<T>>(
  error: unknown,
  cbRejectWithValue: T,
): ReturnType<T> => {
  if (error instanceof AxiosError && error.response?.data?.message) {
    return cbRejectWithValue(error.response.data.message);
  }
  if (error instanceof Error) {
    return cbRejectWithValue(error.message);
  }
  return cbRejectWithValue('Unknown error');
};
