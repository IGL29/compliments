import * as reduxToolkit from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

const { createAsyncThunk } = reduxToolkit;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();
