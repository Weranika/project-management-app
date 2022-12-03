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

import { setShowModalDeleteTask } from '../../reducers/modalPopupSlice';
import { useAppDispatch } from '../../hook';
import { ITaskType, ColumnType } from '../../types';
import { updateTask, deleteTask, setCurrentTask } from '../../reducers/tasksSlice';

import './task.scss';

type FormValues = {
  title: string;
};

export default function Task({ task, column }: { task: ITaskType, column: ColumnType }) {
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
    updateTaskRequest(data);
  });

  const deleteTask = (colId: string) => {
    dispatch(setShowModalDeleteTask(true));
    dispatch(setCurrentTask(colId));
  };

  const updateTaskRequest = (data: FormValues) => {
    const url = `/boards/${boardId}/columns/${column._id}/tasks`;
    dispatch(
      updateTask({
        url: url,
        title: data.title,
        order: column.order,
      }),
    );
    setEditMode(false);
  };

  return (
    <div className="task">
      {editMode ? (
        <div>
          <form className="task__content" onSubmit={onSubmit}>
            <TextField
              className="task-header__input"
              defaultValue={task.title}
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
        <div className="task__content">
          <h3
            className="task__title"
            onClick={() => {
              setEditMode(true);
            }}
          >
            {task.title}
          </h3>
          <IconButton onClick={() => deleteTask(task._id)}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
      )}
  </div>
  );
}
