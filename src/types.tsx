export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface columnState {
  columnsArr: Column[];
  isLoading: boolean;
  hasError: boolean;
}
