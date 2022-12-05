import React from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

import {
  setShowModalDeleteTask,
  setShowModalUpdateTask,
} from '../../reducers/modalPopupSlice';
import { useAppDispatch } from '../../hook';
import { ColumnType, ICreatedTaskType } from '../../types';
import './task.scss';

export default function Task({ task, column }: {
  task: ICreatedTaskType;
  column: ColumnType
}) {
  const dispatch = useAppDispatch();

  const deleteTask = (task: ICreatedTaskType) => {
    dispatch(setShowModalDeleteTask(task));
  };

  const updateTaskRequest = (task: ICreatedTaskType) => {
    dispatch(setShowModalUpdateTask(task));
  };

  return (
    <div className="task">
      <div className="task__content">
        <h3
          className="task__title"
          onClick={() => {
            updateTaskRequest(task);
          }}
        >
          {task.title}
        </h3>
        <IconButton onClick={() => deleteTask(task)}>
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </div>
  );
}
