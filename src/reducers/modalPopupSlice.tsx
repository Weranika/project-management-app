import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICreatedTaskType, InitialUpdateTask } from '../types';

const initialState = {
  showModalCreateColumn: false,
  showModalDeleteColumn: false,
  showModalCreateBoard: false,
  showModalUpdateBoard: false,
  showModalDeleteBoard: false,
  showModalCreateTask: '',
  showModalDeleteTask: null,
  taskCreation: InitialUpdateTask,
  showModalTaskInfo: null,
};

const modalPopupSlice = createSlice({
  name: 'modalPopup',
  initialState,
  reducers: {
    setShowModalCreateColumn(
      state: { showModalCreateColumn: boolean },
      { payload }: PayloadAction<boolean>,
    ) {
      state.showModalCreateColumn = payload;
    },
    setShowModalDeleteColumn(
      state: { showModalDeleteColumn: boolean },
      { payload }: PayloadAction<boolean>,
    ) {
      state.showModalDeleteColumn = payload;
    },
    setShowModalCreateBoard(
      state: { showModalCreateBoard: boolean },
      { payload }: PayloadAction<boolean>,
    ) {
      state.showModalCreateBoard = payload;
    },
    setShowModalUpdateBoard(
      state: { showModalUpdateBoard: boolean },
      { payload }: PayloadAction<boolean>,
    ) {
      state.showModalUpdateBoard = payload;
    },
    setShowModalDeleteBoard(
      state: { showModalDeleteBoard: boolean },
      { payload }: PayloadAction<boolean>,
    ) {
      state.showModalDeleteBoard = payload;
    },
    setShowModalCreateTask(
      state: { showModalCreateTask: string },
      { payload }: PayloadAction<string>,
    ) {
      state.showModalCreateTask = payload;
    },
    setShowModalDeleteTask(
      state: { showModalDeleteTask: ICreatedTaskType | null },
      { payload }: PayloadAction<ICreatedTaskType | null>,
    ) {
      state.showModalDeleteTask = payload;
    },
    setShowModalUpdateTask(
      state: { taskCreation: ICreatedTaskType | null},
      { payload }: PayloadAction<ICreatedTaskType | null>,
    ) {
      state.taskCreation = payload;
    },
    setShowModalTaskInfo(
      state: { showModalTaskInfo: ICreatedTaskType | null; },
      { payload }: PayloadAction<ICreatedTaskType | null>,
    ) {
      state.showModalTaskInfo = payload;
    },
  },
});
export default modalPopupSlice.reducer;
export const {
  setShowModalCreateColumn,
  setShowModalDeleteColumn,
  setShowModalCreateBoard,
  setShowModalUpdateBoard,
  setShowModalDeleteBoard,
  setShowModalCreateTask,
  setShowModalDeleteTask,
  setShowModalUpdateTask,
  setShowModalTaskInfo,
} = modalPopupSlice.actions;
