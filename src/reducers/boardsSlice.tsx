import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { BoardType, BoardState } from '../types';
import axiosConfig from '../util/axiosConfig';

type FetchError = {
  message: string;
};

export const updateBoard = createAsyncThunk<
  { data: BoardType },
  {
    url: string;
    title: string;
    description: string;
    owner: string;
    users: [string];
  },
  { rejectValue: FetchError }
>(
  'boards/put',
  async (
    boardData: {
      url: string;
      title: string;
      description: string;
      owner: string;
      users: [string];
    },
    thunkApi,
  ) => {
    const { url, title, description, owner, users } = boardData;
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axiosConfig.put(
        url,
        {
          title: title,
          description: description,
          owner: owner,
          users: users,
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
          message: 'Failed to update the board.',
        });
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Failed to update the board.',
      });
    }
  },
);

export const createBoard = createAsyncThunk<
  { data: BoardType },
  {
    url: string;
    title: string;
    description: string;
    owner: string;
    users: [string];
  },
  { rejectValue: FetchError }
>(
  'boards/post',
  async (
    boardData: {
      url: string;
      title: string;
      description: string;
      owner: string;
      users: [string];
    },
    thunkApi,
  ) => {
    const { url, title, description, owner, users } = boardData;
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axiosConfig.post(
        url,
        {
          title: title,
          description: description,
          owner: owner,
          users: users,
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
          message: 'Failed to create the board.',
        });
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Failed to create the board.',
      });
    }
  },
);

export const getBoards = createAsyncThunk<
  { data: BoardType[] },
  string,
  { rejectValue: FetchError }
>('boards/get', async (url: string, thunkApi) => {
  const jwt = localStorage.getItem('jwt');
  try {
    const response = await axiosConfig.get(url, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });

    if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: 'Failed to get boards.',
      });
    }
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Failed to get boards.',
    });
  }
});

export const deleteBoard = createAsyncThunk<
  { data: BoardType },
  string,
  { rejectValue: FetchError }
>('boards/delete', async (url: string, thunkApi) => {
  const jwt = localStorage.getItem('jwt');
  try {
    const response = await axiosConfig.delete(url, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });

    if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: 'Failed to delete the board.',
      });
    }
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Failed to delete the board.',
    });
  }
});

const initialState = {
  boardsArr: [],
  isLoading: false,
  hasError: false,
  currentBoardId: '',
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards(state: BoardState, { payload }: PayloadAction<BoardType[]>) {
      state.boardsArr = [...payload];
    },
    setCurrentBoard(state: BoardState, { payload }: PayloadAction<string>) {
      state.currentBoardId = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBoards.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getBoards.fulfilled,
        (
          state: BoardState,
          { payload }: PayloadAction<{ data: BoardType[] }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          state.boardsArr = [...payload.data];
        },
      )
      .addCase(getBoards.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        state.boardsArr = [];
      })
      .addCase(createBoard.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        createBoard.fulfilled,
        (
          state: BoardState,
          { payload }: PayloadAction<{ data: BoardType }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          state.boardsArr = [...state.boardsArr, payload.data];
        },
      )
      .addCase(createBoard.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateBoard.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        updateBoard.fulfilled,
        (
          state: BoardState,
          { payload }: PayloadAction<{ data: BoardType }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          const newArr = state.boardsArr.map(board => {
            if (board._id == payload.data._id) {
              board = payload.data;
            }
            return board;
          });
          state.boardsArr = newArr;
        },
      )
      .addCase(updateBoard.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteBoard.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        deleteBoard.fulfilled,
        (
          state: BoardState,
          { payload }: PayloadAction<{ data: BoardType }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          state.boardsArr = [...state.boardsArr].filter(board => {
            return board._id !== payload.data._id;
          });
        },
      )
      .addCase(deleteBoard.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
export default boardsSlice.reducer;
export const { setBoards, setCurrentBoard } = boardsSlice.actions;
