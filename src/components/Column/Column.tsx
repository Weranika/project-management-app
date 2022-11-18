import React, { useEffect, useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hook';
import axiosConfig from '../../util/axiosConfig';
import { ColumnType, columnState, modalPopupState } from '../../types';
import { setShowModalDeleteColumn } from '../../reducers/modalPopupSlice';
import { updateColumn, setCurrentColumn } from '../../reducers/columnsSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import './Column.scss';

export default function Column({ column }: { column: ColumnType }) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const dispatch = useAppDispatch();
  const { showModalDeleteColumn } = useSelector(
    (state: { modalPopup: modalPopupState }) => state.modalPopup,
  );

  const deleteColumn = (colId: string) => {
    dispatch(setShowModalDeleteColumn(true));
    dispatch(setCurrentColumn(colId));
  };

  const updateColumnRequest = (event: FormEvent, id: string, order: number) => {
    const url = `/boards/636fcdd30cb48a0c4248c4b4/columns/${id}`;
    event.preventDefault();
    dispatch(
      updateColumn({
        url: url,
        title: newTitle,
        order: order,
      }),
    );
    setEditMode(false);
  };

  return (
    <div className="column">
      <div className="column__header">
        {editMode ? (
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={event => setNewTitle(event.target.value)}
            />
            <button
              onClick={(event: FormEvent) =>
                updateColumnRequest(event, column._id, column.order)
              }
            >
              Ok
            </button>
          </div>
        ) : (
          <h3
            className="column__title"
            onClick={() => {
              setEditMode(true);
              setNewTitle(column.title);
            }}
          >
            {column.title}
          </h3>
        )}
        <IconButton onClick={() => deleteColumn(column._id)}>
          <DeleteForeverIcon />
        </IconButton>
        {/* <button onClick={() => deleteColumn(column._id)}>
          
        </button> */}
      </div>
      <button>Add task</button>
    </div>
  );
}
