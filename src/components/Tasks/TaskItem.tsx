import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import {
  setShowModalDeleteTask,
  setShowModalUpdateTask,
  setShowModalTaskInfo,
} from '../../reducers/modalPopupSlice';
import { useAppDispatch } from '../../hook';

import {
  ColumnType,
  ICreatedTaskType,
  ModalPopupState,
  BoardState,
} from '../../types';
import './task.scss';

type FormValues = {
  title: string;
  description: string;
};

export default function Task({ task, column }: { task: ICreatedTaskType, column: ColumnType }) {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const deleteTask = (task: ICreatedTaskType) => {
    dispatch(setShowModalDeleteTask(task));
  };

  const updateTaskRequest = (task: ICreatedTaskType) => {
    dispatch(setShowModalUpdateTask(task));
  };

  return (
    <div className="task"
      onClick={event => {
        //event.stopPropagation();
        updateTaskRequest(task);
      }}
    >
      <div className="task__content">
        <h3
          className="task__title"
          // onClick={() => {
          //   setEditMode(true);
          // }}
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
