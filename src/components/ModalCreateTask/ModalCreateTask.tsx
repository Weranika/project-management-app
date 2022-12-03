import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { setShowModalCreateTask } from '../../reducers/modalPopupSlice';
import { createTask } from '../../reducers/tasksSlice';
import { ITaskState, ITaskType, ModalPopupState } from '../../types';
import { useAppDispatch } from '../../hook';


type FormValues = {
  title: string;
  description: string;
};

export default function ModalCreateTask({ url }: { url: string }) {
  const dispatch = useAppDispatch();
  const { tasksArr } = useSelector(
    (state: { tasks: ITaskState }) => state.tasks,
  );
  const { showModalCreateTask } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => {
    createTaskRequest(data);
  });

  const createTaskRequest = (data: FormValues) => {
    dispatch(
      createTask({
        url: url,
        title: data.title,
        order: tasksArr.length,
        description: data.description,
        userId: 1,
        users: []
      }),
    );
    dispatch(setShowModalCreateTask(false));
  };
  console.log(url);

  return (
    <div>
      <Dialog
        open={showModalCreateTask}
        onClose={() => dispatch(setShowModalCreateTask(false))}
      >
        <DialogTitle>
          <FormattedMessage id='create_task' />
        </DialogTitle>
        <form className="create-task__form" onSubmit={onSubmit}>
          <DialogContent sx={{ width: '20rem' }}>
            <TextField
              fullWidth
              id="task-title"
              label="Task title"
              variant="outlined"
              {...register('title', {
                required: 'This field is required.',
                minLength: {
                  value: 4,
                  message: 'This field should be more than 4 symbols',
                },
              })}
              helperText={errors.title && errors.title.message}
              error={errors.title ? true : false}
            />
            <TextField
              fullWidth
              id="task-description"
              label="Description"
              variant="outlined"
              {...register('description', {
                required: 'This field is required.',
                minLength: {
                  value: 4,
                  message: 'This field should be more than 4 symbols',
                },
              })}
              helperText={errors.title && errors.title.message}
              error={errors.title ? true : false}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">
              <FormattedMessage id='submit' />
            </Button>
            <Button onClick={() => dispatch(setShowModalCreateTask(false))}>
              <FormattedMessage id='cancel' />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
