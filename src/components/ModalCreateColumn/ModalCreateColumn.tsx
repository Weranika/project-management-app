import React, { FormEvent, useState } from 'react';
import { modalPopupState, columnState } from '../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hook';
import { setShowModal } from '../../reducers/modalPopupSlice';
import { createColumn, getColumns } from '../../reducers/columnsSlice';

export default function ModalCreateColumn() {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const { showModal } = useSelector(
    (state: { modalPopup: modalPopupState }) => state.modalPopup,
  );
  const { columnsArr } = useSelector(
    (state: { columns: columnState }) => state.columns,
  );

  const createColumnRequest = (event: FormEvent) => {
    event.preventDefault();
    console.log(event.target);
    dispatch(
      createColumn({
        url: `/boards/636fcdd30cb48a0c4248c4b4/columns`,
        title: title,
        order: columnsArr.length,
      }),
    );
    dispatch(setShowModal(false));
    dispatch(getColumns(`/boards/636fcdd30cb48a0c4248c4b4/columns`));
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
        <button onClick={() => dispatch(setShowModal(false))}>&time;</button>
      </form>
    </div>
  );
}
