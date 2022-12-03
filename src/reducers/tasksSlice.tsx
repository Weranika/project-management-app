import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITaskType, ITaskState, ITaskModel } from '../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import axiosConfig from '../util/axiosConfig';

const initialState = {
  tasksArr: [],
  isLoading: false,
  hasError: false,
  currentTaskId: '',
  message: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state: ITaskState, { payload }: PayloadAction<ITaskType[]>) {
      state.tasksArr = [...payload];
    },
    setMessage(state: ITaskState, { payload }: PayloadAction<string>) {
      state.message = payload;
    },
    setCurrentTask(state: ITaskState, { payload }: PayloadAction<string>) {
      state.currentTaskId = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getTasks.fulfilled,
        (
          state: ITaskState,
          { payload }: PayloadAction<{ data: ITaskType[] }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          state.tasksArr = [...payload.data];
        },
      )
      .addCase(getTasks.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        state.tasksArr = [];
        state.message = 'Failed to get the tasks.';
      })
      .addCase(createTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        createTask.fulfilled,
        (
          state: ITaskState,
          { payload }: PayloadAction<{ data: ITaskType }>,
        ) => {
          console.log(payload, 'payload');
          state.isLoading = false;
          state.hasError = false;
          state.tasksArr = [...state.tasksArr, payload.data];
          state.message = 'The task was successfully created.';
        },
      )
      .addCase(createTask.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        state.message = 'Failed to create the task.';
      })

      .addCase(updateTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        updateTask.fulfilled,
        (
          state: ITaskState,
          { payload }: PayloadAction<{ data: ITaskType }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          const newArr = state.tasksArr.map(task => {
            if (task._id == payload.data._id) {
              task = payload.data;
            }
            return task;
          });
          state.tasksArr = newArr;
          state.message = 'The task was successfully updated.';
        },
      )
      .addCase(updateTask.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        state.message = 'Failed to update the task.';
      })
      .addCase(deleteTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        deleteTask.fulfilled,
        (
          state: ITaskState,
          { payload }: PayloadAction<{ data: ITaskType }>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          state.tasksArr = [...state.tasksArr].filter(task => {
            return task._id !== payload.data._id;
          });
          state.message = 'The task was successfully deleted.';
        },
      )
      .addCase(deleteTask.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
        state.message = 'Failed to delete the task.';
      });
  },
});

export const getTasks = createAsyncThunk(
  'tasks/get',
  async (url: string, thunkApi) => {
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axiosConfig.get(url, {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      });

      if (response.status !== 200) {
        return thunkApi.rejectWithValue({
          message: 'Failed to get tasks.',
        });
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Failed to get tasks.',
      });
    }
  },
);

export const createTask = createAsyncThunk(
  'task/post',
  async (taskData: ITaskModel & { url: string }, thunkApi) => {
    const { url, title, order, description } = taskData;
    console.log('thunk', url);
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axiosConfig.post(
        url,
        {
          title: title,
          order: order,
          description: description,
          userId: 1,
          users: [],
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        },
      );

      if (response.status !== 200) {
        return thunkApi.rejectWithValue({
          message: 'Failed to create the task.',
        });
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Failed to create the task.',
      });
    }
  },
);

export const updateTask = createAsyncThunk(
  'task/put',
  async (
    taskData: { url: string; title: string; order: number },
    thunkApi,
  ) => {
    const { url, title, order } = taskData;
    const jwt = localStorage.getItem('jwt');
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
        return thunkApi.rejectWithValue({
          message: 'Failed to update the task.',
        });
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Failed to update the task.',
      });
    }
  },
);

export const deleteTask = createAsyncThunk(
  'task/delete',
  async (url: string, thunkApi) => {
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axiosConfig.delete(url, {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      });

      if (response.status !== 200) {
        return thunkApi.rejectWithValue({
          message: 'Failed to delete the task.',
        });
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Failed to delete the task.',
      });
    }
  }
);

export default tasksSlice.reducer;
export const { setTasks, setMessage, setCurrentTask } = tasksSlice.actions;
