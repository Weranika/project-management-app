import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Column, columnState } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';
import axiosConfig from './util/axiosConfig';

type FetchError = {
  message: string;
};

// const showColumns = async (url: string) => {
//   const jwt =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjgyNzE0NDcsImV4cCI6MTY2ODMxNDY0N30.qBTcsCN4XIxqntImcPYJ1eVtMZ9zZXygg4gtU3dUKRM';
//   try {
//     const apiData = await axiosConfig.get(url, {
//       headers: {
//         authorization: `Bearer ${jwt}`,
//       },
//     });
//     console.log(apiData);
//     setColumns(apiData.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getColumns = createAsyncThunk<{ data: Column[] }, string, { rejectValue: FetchError }>(
  'columns/get',
  async (url: string, thunkApi) => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjgzNjExMjYsImV4cCI6MTY2ODQwNDMyNn0.1k6wJZUwH2KE_RGH3o8QXbmdzfREuwPSdjYIasH6X7o';
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
  }
);

const initialState = {
  columnsArr: [],
  isLoading: false,
  hasError: false,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state: columnState, { payload }: PayloadAction<Column[]>) {
      state.columnsArr = [...payload];
    },
    /*     setCurrentPage(state: MyState, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
    setAllPages(state: MyState, { payload }: PayloadAction<number>) {
      state.allPages = payload;
    },
    setCardsPerPage(state: MyState, { payload }: PayloadAction<number>) {
      state.cardsPerPage = payload;
    },
    setSorting(state: MyState, { payload }: PayloadAction<string>) {
      state.sorting = payload;
    },
    setError(state: MyState, { payload }: PayloadAction<boolean>) {
      state.hasError = payload;
    }, */
  },
  extraReducers(builder) {
    builder
      .addCase(getColumns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getColumns.fulfilled,
        (state: columnState, { payload }: PayloadAction<{ data: Column[] }>) => {
          state.isLoading = false;
          state.hasError = false;
          state.columnsArr = [...payload.data];
        }
      )
      .addCase(getColumns.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.columnsArr = [];
      });
  },
});
export default columnsSlice.reducer;
export const { setColumns } = columnsSlice.actions;
