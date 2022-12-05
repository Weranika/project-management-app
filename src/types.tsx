export interface ColumnType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ColumnState {
  columnsArr: ColumnType[];
  isLoading: boolean;
  hasError: boolean;
  currentColumnId: string;
  message: string;
}

export interface ModalPopupState {
  showModalCreateColumn: boolean;
  showModalDeleteColumn: boolean;
  showModalCreateBoard: boolean;
  showModalUpdateBoard: boolean;
  showModalDeleteBoard: boolean;
  showModalCreateTask: string;
  showModalDeleteTask: ICreatedTaskType | null;
  taskCreation: ICreatedTaskType | null;
  showModalTaskInfo: ICreatedTaskType | null;
}

export interface BoardType {
  _id: string;
  title: string;
  description: string;
  owner: string;
  users: [string];
}

export interface BoardState {
  boardsArr: BoardType[];
  isLoading: boolean;
  hasError: boolean;
  message: string;
  currentBoardId: string;
  currentBoardTitle: string;
  currentBoardDescription: string;
}
export interface ITaskType {
  _id: string;
  title: string;
  order: number;
  taskId: string;
  columnId: string;
}
export interface ICreatedTaskType {
  _id: string;
  title: string;
  order: number;
  taskId: string;
  columnId: string;
  boardId: string;
  description: string;
  userId: number;
  users: Array<string>;
}
export interface ITaskModel {
  title: string;
  order: number | undefined;
  description: string;
  userId: number;
  users: Array<string>;
}
export interface ITaskState {
  tasksArr: ICreatedTaskType[];
  isLoading: boolean;
  hasError: boolean;
  currentTaskId: string;
  message: string;
}
export const InitialUpdateTask = {
  _id: '',
  title: '',
  order: 0,
  taskId: '',
  columnId: '',
  boardId: '',
  description: '',
  userId: 0,
  users: [],
};
