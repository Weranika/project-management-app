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
}
