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
  showModalCreateTask: boolean;
  showModalDeleteTask: boolean;
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
export interface ITaskModel {
  title: string;
  order: number;
  description: string;
  userId: number;
  users: Array<string>;
}
export interface ITaskState {
  tasksArr: ITaskType[];
  isLoading: boolean;
  hasError: boolean;
  currentTaskId: string;
  message: string;
}
