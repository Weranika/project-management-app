import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Column, columnState } from '../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import axiosConfig from '../util/axiosConfig';

/* export const getColumns = createAsyncThunk<
  { data: Column[] },
  string,
  { rejectValue: FetchError }
>('columns/get', async (url: string, thunkApi) => {
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg1MTU0ODAsImV4cCI6MTY2ODU1ODY4MH0.mLwKwTgBB0rBQd8mzHkdyqFRzhJmh6srUKhExGsIlxo';
  try {
    const response = await axiosConfig.get(url, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    console.log(response);

    if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: 'Failed to get columns.',
      });
    }
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Failed to get columns.',
    });
  }
}); */

const initialState = {
  showModal: false,
};

const modalPopupSlice = createSlice({
  name: 'modalPopup',
  initialState,
  reducers: {
    setShowModal(
      state: { showModal: boolean },
      { payload }: PayloadAction<boolean>,
    ) {
      state.showModal = payload;
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(getColumns.pending, state => {
  //       state.isLoading = true;
  //     })
  //     .addCase(
  //       getColumns.fulfilled,
  //       (
  //         state: columnState,
  //         { payload }: PayloadAction<{ data: Column[] }>,
  //       ) => {
  //         state.isLoading = false;
  //         state.hasError = false;
  //         state.columnsArr = [...payload.data];
  //       },
  //     )
  //     .addCase(getColumns.rejected, state => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //       state.columnsArr = [];
  //     });
  // },
});
export default modalPopupSlice.reducer;
export const { setShowModal } = modalPopupSlice.actions;
