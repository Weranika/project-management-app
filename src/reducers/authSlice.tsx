import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '../types';

const initialState = {
  isAuth: false,
  isLoading: false,
  hasError: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state: AuthState, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },
    setMessage(state: AuthState, { payload }: PayloadAction<string>) {
      state.message = payload;
    },
    setIsLoading(state: AuthState, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
    setHasError(state: AuthState, { payload }: PayloadAction<boolean>) {
      state.hasError = payload;
    },
  },
});
export default authSlice.reducer;
export const { setIsAuth, setMessage, setHasError, setIsLoading } =
  authSlice.actions;
