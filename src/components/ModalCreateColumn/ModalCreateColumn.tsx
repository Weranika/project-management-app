import React, { FormEvent, useState } from 'react';
import { modalPopupState, columnState } from '../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hook';
import { setShowModal } from '../../reducers/modalPopupSlice';
import { createColumn, getColumns } from '../../reducers/columnsSlice';

export default function ModalCreateColumn({ url }: { url: string }) {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const { columnsArr } = useSelector(
    (state: { columns: columnState }) => state.columns,
  );

  const createColumnRequest = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      createColumn({
        url: url,
        title: title,
        order: columnsArr.length,
      }),
    );
    dispatch(getColumns(url));
    dispatch(setShowModal(false));
  };
  return (
    <div>
      <form onSubmit={(event: FormEvent) => createColumnRequest(event)}>
        <label>Title</label>
        <input
          type="text"
          name="column__title"
          id="column__title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <button type="submit">Create</button>
        <button onClick={() => dispatch(setShowModal(false))}>Cancel</button>
        <button onClick={() => dispatch(setShowModal(false))}>&Time;</button>
      </form>
    </div>
  );
}
