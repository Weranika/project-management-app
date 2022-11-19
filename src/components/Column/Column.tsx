import React, { useState, FormEvent } from 'react';
import { useAppDispatch } from '../../hook';
import { ColumnType } from '../../types';
import { setShowModalDeleteColumn } from '../../reducers/modalPopupSlice';
import { updateColumn, setCurrentColumn } from '../../reducers/columnsSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import './Column.scss';

export default function Column({ column }: { column: ColumnType }) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const dispatch = useAppDispatch();

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
          <div className="column__header--edit-mode">
            <OutlinedInput
              className="column__header__input"
              value={newTitle}
              onChange={event => setNewTitle(event.target.value)}
            />
            <Button
              style={{ minWidth: '1rem' }}
              onClick={(event: FormEvent) =>
                updateColumnRequest(event, column._id, column.order)
              }
              autoFocus
            >
              <CheckOutlinedIcon />
            </Button>
            <Button
              style={{ minWidth: '1rem' }}
              onClick={() => {
                setEditMode(false);
              }}
            >
              <ClearOutlinedIcon />
            </Button>
          </div>
        ) : (
          <div className="column__header--read-mode">
            <h3
              className="column__title"
              onClick={() => {
                setEditMode(true);
                setNewTitle(column.title);
              }}
            >
              {column.title}
            </h3>
            <IconButton onClick={() => deleteColumn(column._id)}>
              <DeleteForeverIcon />
            </IconButton>
          </div>
        )}
      </div>
      <Button variant="contained">+ Add task</Button>
    </div>
  );
}
