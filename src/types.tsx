export interface ColumnType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface columnState {
  columnsArr: ColumnType[];
  isLoading: boolean;
  hasError: boolean;
  currentColumnId: string;
}

export interface modalPopupState {
  showModalCreateColumn: boolean;
  showModalDeleteColumn: boolean;
}
