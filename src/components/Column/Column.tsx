import React, { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { setShowModalDeleteColumn } from '../../reducers/modalPopupSlice';
import { updateColumn, setCurrentColumn } from '../../reducers/columnsSlice';
import { useAppDispatch } from '../../hook';
import { ColumnType } from '../../types';

import './Column.scss';
import { TextField } from '@mui/material';

type FormValues = {
  title: string;
};

export default function Column({ column }: { column: ColumnType }) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const dispatch = useAppDispatch();

  const param = useParams();
  const boardId = param.id;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  // const onSubmit = handleSubmit(data => {
  //   updateColumnRequest(data);
  // });

  const deleteColumn = (colId: string) => {
    dispatch(setShowModalDeleteColumn(true));
    dispatch(setCurrentColumn(colId));
  };

  const updateColumnRequest = (event: FormEvent, id: string, order: number) => {
    const url = `/boards/${boardId}/columns/${id}`;
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
            <form className="column__header--edit-mode">
              <TextField
                className="column__header__input"
                // value={newTitle}
                // onChange={event => setNewTitle(event.target.value)}
                {...register('title', {
                  required: 'This field is required.',
                  minLength: {
                    value: 4,
                    message: 'This field should be more than 4 symbols',
                  },
                })}
                helperText={errors.title && errors.title.message}
                error={errors.title ? true : false}
                size="small"
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
            </form>
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
