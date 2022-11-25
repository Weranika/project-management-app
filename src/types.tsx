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
}

export interface ModalPopupState {
  showModalCreateColumn: boolean;
  showModalDeleteColumn: boolean;
  showModalCreateBoard: boolean;
  showModalDeleteBoard: boolean;
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
  currentBoardId: string;
}
