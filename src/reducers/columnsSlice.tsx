import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ColumnType, columnState } from '../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import axiosConfig from '../util/axiosConfig';

type FetchError = {
  message: string;
};

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
  currentColumnId: '',
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state: columnState, { payload }: PayloadAction<ColumnType[]>) {
      state.columnsArr = [...payload];
    },
    setCurrentColumn(state: columnState, { payload }: PayloadAction<string>) {
      state.currentColumnId = payload;
    },
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
          state.isLoading = false;
          state.hasError = false;
          const newArr = state.columnsArr.map(column => {
            if (column._id == payload.data._id) {
              column = payload.data;
            }
            return column;
          });
          state.columnsArr = newArr;
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
          state.isLoading = false;
          state.hasError = false;
          state.columnsArr = [...state.columnsArr].filter(column => {
            return column._id !== payload.data._id;
          });
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
export const { setColumns, setCurrentColumn } = columnsSlice.actions;
