import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ColumnType, columnState } from '../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import axiosConfig from '../util/axiosConfig';

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

// export const createColumn = async (title: string, order: number) => {
//   console.log('create column');
//   const url = `/boards/636fcdd30cb48a0c4248c4b4/columns`;
//   const jwt =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg1MTU0ODAsImV4cCI6MTY2ODU1ODY4MH0.mLwKwTgBB0rBQd8mzHkdyqFRzhJmh6srUKhExGsIlxo';
//   try {
//     const apiData = await axiosConfig.post(
//       url,
//       {
//         title: title,
//         order: order,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${jwt}`,
//         },
//       },
//     );
//     console.log(apiData);
//     dispatch(getColumns(url));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateColumn = createAsyncThunk<
  { data: ColumnType },
  { url: string; title: string; order: number },
  { rejectValue: FetchError }
>(
  'columns/put',
  async (
    columnData: { url: string; title: string; order: number },
    thunkApi,
  ) => {
    const { url, title, order } = columnData;
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg3Njg5MDksImV4cCI6MTY2ODgxMjEwOX0.D37-HLT4L2ixa-AAWK8QJpB7R-6CmsyWKf_K8guSLqY';
    try {
      const response = await axiosConfig.put(
        url,
        {
          title: title,
          order: order,
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        },
      );

      if (response.status !== 200) {
        // Return the error message:
        return thunkApi.rejectWithValue({
          message: 'Failed to update the column.',
        });
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Failed to update the column.',
      });
    }
  },
);

export const createColumn = createAsyncThunk<
  { data: ColumnType },
  { url: string; title: string; order: number },
  { rejectValue: FetchError }
>(
  'columns/post',
  async (
    columnData: { url: string; title: string; order: number },
    thunkApi,
  ) => {
    const { url, title, order } = columnData;
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg3Njg5MDksImV4cCI6MTY2ODgxMjEwOX0.D37-HLT4L2ixa-AAWK8QJpB7R-6CmsyWKf_K8guSLqY';
    try {
      const response = await axiosConfig.post(
        url,
        {
          title: title,
          order: order,
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        },
      );

      if (response.status !== 200) {
        // Return the error message:
        return thunkApi.rejectWithValue({
          message: 'Failed to create the column.',
        });
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Failed to create the column.',
      });
    }
  },
);

export const getColumns = createAsyncThunk<
  { data: ColumnType[] },
  string,
  { rejectValue: FetchError }
>('columns/get', async (url: string, thunkApi) => {
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg3Njg5MDksImV4cCI6MTY2ODgxMjEwOX0.D37-HLT4L2ixa-AAWK8QJpB7R-6CmsyWKf_K8guSLqY';
  try {
    const response = await axiosConfig.get(url, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });

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
});

export const deleteColumn = createAsyncThunk<
  { data: ColumnType },
  string,
  { rejectValue: FetchError }
>('columns/delete', async (url: string, thunkApi) => {
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg3Njg5MDksImV4cCI6MTY2ODgxMjEwOX0.D37-HLT4L2ixa-AAWK8QJpB7R-6CmsyWKf_K8guSLqY';
  try {
    const response = await axiosConfig.delete(url, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });

    if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: 'Failed to delete the column.',
      });
    }
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Failed to delete the column.',
    });
  }
});

const initialState = {
  columnsArr: [],
  isLoading: false,
  hasError: false,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state: columnState, { payload }: PayloadAction<ColumnType[]>) {
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
      .addCase(getColumns.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getColumns.fulfilled,
        (
          state: columnState,
          { payload }: PayloadAction<{ data: ColumnType[] }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          state.columnsArr = [...payload.data];
        },
      )
      .addCase(getColumns.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        state.columnsArr = [];
      })
      .addCase(createColumn.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        createColumn.fulfilled,
        (
          state: columnState,
          { payload }: PayloadAction<{ data: ColumnType }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          state.columnsArr = [...state.columnsArr, payload.data];
        },
      )
      .addCase(createColumn.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        // state.columnsArr = [];
      })
      .addCase(updateColumn.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        updateColumn.fulfilled,
        (
          state: columnState,
          { payload }: PayloadAction<{ data: ColumnType }>,
        ) => {
          console.log('I am here');
          state.isLoading = false;
          state.hasError = false;
          console.log('pay id', payload.data);
          const newArr = state.columnsArr.map(column => {
            if (column._id == payload.data._id) {
              column = payload.data;
            }
            return column;
          });
          console.log(newArr);
          state.columnsArr = newArr;

          //state.columnsArr = [...payload.data];
        },
      )
      .addCase(updateColumn.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        // state.columnsArr = [];
      })
      .addCase(deleteColumn.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        deleteColumn.fulfilled,
        (
          state: columnState,
          { payload }: PayloadAction<{ data: ColumnType }>,
        ) => {
          console.log('to delete', payload.data);
          state.isLoading = false;
          state.hasError = false;
          state.columnsArr = [...state.columnsArr].filter(
            column => column !== payload.data,
          );
        },
      )
      .addCase(deleteColumn.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        // state.columnsArr = [];
      });
  },
});
export default columnsSlice.reducer;
export const { setColumns } = columnsSlice.actions;
