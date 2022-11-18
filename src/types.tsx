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
}

export interface modalPopupState {
  showModalCreateColumn: boolean;
  showModalDeleteColumn: boolean;
}
