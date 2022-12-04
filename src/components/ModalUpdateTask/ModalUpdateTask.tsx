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
import { ModalPopupState, InitialUpdateTask } from '../../types';
import { useAppDispatch } from '../../hook';

type FormValues = {
  title: string;
  description: string;
};

export default function ModalUpdateTask({ url }: { url: string }) {
  const dispatch = useAppDispatch();  

  const { taskCreation } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

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

    dispatch(setShowModalUpdateTask(InitialUpdateTask));
  };
  return (
    <div>
      <Dialog
        open={ taskCreation === InitialUpdateTask ? false : true }
        onClose={() => dispatch(setShowModalUpdateTask(InitialUpdateTask))}
      >
        <DialogTitle>
          <FormattedMessage id='update_task' />
        </DialogTitle>
        <form className="create-task__form" onSubmit={onSubmit}>
          <DialogContent sx={{ width: '20rem' }}>
            <TextField
              fullWidth
              sx={{ display: 'block', mb: '1rem' }}
              id="outlined-basic"
              label="Board title"
              variant="outlined"
              defaultValue={taskCreation.title}
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
              id="outlined-basic"
              label="Board description"
              variant="outlined"
              {...register('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">
              <FormattedMessage id='confirm' />
            </Button>
            <Button onClick={() => dispatch(setShowModalUpdateTask(InitialUpdateTask))}>
              <FormattedMessage id='cancel' />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
