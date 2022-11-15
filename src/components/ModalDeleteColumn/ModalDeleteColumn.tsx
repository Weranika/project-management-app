import React, { FormEvent } from 'react';
import { useAppDispatch } from '../../hook';
import { setShowModalDeleteColumn } from '../../reducers/modalPopupSlice';
import { deleteColumn, getColumns } from '../../reducers/columnsSlice';

export default function ModalDeleteColumn({ url }: { url: string }) {
  const dispatch = useAppDispatch();

  const deleteColumnRequest = (event: FormEvent) => {
    event.preventDefault();
    dispatch(deleteColumn(url));
    dispatch(getColumns(url));
    dispatch(setShowModalDeleteColumn(false));
  };
  return (
    <div>
      <form onSubmit={(event: FormEvent) => deleteColumnRequest(event)}>
        <label>Do you really want to delete the list?</label>
        <button type="submit">Delete</button>
        <button onClick={() => dispatch(setShowModalDeleteColumn(false))}>
          Cancel
        </button>
      </form>
    </div>
  );
}
