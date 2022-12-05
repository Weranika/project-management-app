import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import {
  setShowModalDeleteColumn,
  setShowModalCreateTask } from '../../reducers/modalPopupSlice';
import { updateColumn, setCurrentColumn } from '../../reducers/columnsSlice';
import { useAppDispatch } from '../../hook';
import { ColumnType } from '../../types';
import TasksList from '../Tasks/TasksList';
import Spinner from '../Spinner/Spinner';

import './Column.scss';

type FormValues = {
  title: string;
};

export default function Column({ column }: { column: ColumnType }) {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const param = useParams();
  const boardId = param.id;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => {
    updateColumnRequest(data);
  });

  const deleteColumn = (colId: string) => {
    dispatch(setShowModalDeleteColumn(true));
    dispatch(setCurrentColumn(colId));
  };

  const updateColumnRequest = (data: FormValues) => {
    const url = `/boards/${boardId}/columns/${column._id}`;
    dispatch(
      updateColumn({
        url: url,
        title: data.title,
        order: column.order,
      }),
    );
    setEditMode(false);
  };

  return (
    <div className="column">
      <div className="column__header">
        {editMode ? (
          <div>
            <form className="column__header--edit-mode" onSubmit={onSubmit}>
              <TextField
                className="column__header__input"
                defaultValue={column.title}
                {...register('title', {
                  required: 'This field is required.',
                  minLength: {
                    value: 4,
                    message: 'This field should be more than 4 symbols',
                  },
                })}
                error={errors.title ? true : false}
                size="small"
              />
              {errors.title && (
                <p className="column__error-message">{errors.title.message}</p>
              )}
              <Button type="submit" style={{ minWidth: '1rem' }} autoFocus>
                <CheckOutlinedIcon />
              </Button>
              <Button
                style={{ minWidth: '1rem' }}
                onClick={() => {
                  setEditMode(false);
                  reset();
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
      <TasksList column={column}/>
      <Button
        variant="contained"
        onClick={() => dispatch(setShowModalCreateTask(column._id))}
      >
        <FormattedMessage id='add_task' />
      </Button>
    </div>
  );
}
