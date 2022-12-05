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

import { setShowModalUpdateTask } from '../../reducers/modalPopupSlice';
import { updateTask } from '../../reducers/tasksSlice';
import { ModalPopupState, InitialUpdateTask, ICreatedTaskType } from '../../types';
import { useAppDispatch } from '../../hook';
import './modalTaskInfo.scss';
import { NullLiteral } from 'typescript';

type FormValues = {
  title: string;
  description: string;
};

export default function ModalUpdateTask({ url, task }: { url: string, task: ICreatedTaskType | null}) {
  const dispatch = useAppDispatch();  

  // const { taskCreation } = useSelector(
  //   (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  // );
  const taskCreation = task as ICreatedTaskType;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => {
    updateTaskRequest(data);
  });

  const updateTaskRequest = (data: FormValues) => {
    dispatch(
      updateTask({
        url: url,
        title: data.title,
        order: taskCreation.order,
        description: data.description,
        columnId: taskCreation.columnId,
        userId: 1,
        users: [],
        _id: taskCreation._id,
        taskId: '',
        boardId: '',
      }),
    );

    dispatch(setShowModalUpdateTask(null));
  };

  return (
    <div>
      <Dialog
        open={ taskCreation === null ? false : true }
        onClose={() => dispatch(setShowModalUpdateTask(null))}
        className="modal-task"
      >
        <form className="create-task__form" onSubmit={onSubmit}>
          <DialogContent sx={{ width: '20rem' }}>
            <TextField
              fullWidth
              sx={{ display: 'block', mb: '1rem' }}
              id="standard-basic"
              label="Task title"
              variant="outlined"
              defaultValue={taskCreation.title}
              className="modal-task__title"
              {...register('title', {
                required: 'This field is required.',
                minLength: {
                  value: 5,
                  message: 'This field should be more than 5 symbols',
                },
              })}
              helperText={errors.title && errors.title.message}
              error={errors.title ? true : false}
            />
            <TextField
              fullWidth
              defaultValue={taskCreation.description}
              id="outlined-multiline-static"
              label="Description"
              multiline
              className="modal-task__description"
              {...register('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">
              <FormattedMessage id='confirm' />
            </Button>
            <Button onClick={() => dispatch(setShowModalUpdateTask(null))}>
              <FormattedMessage id='cancel' />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
