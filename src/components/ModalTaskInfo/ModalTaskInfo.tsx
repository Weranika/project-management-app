import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, DialogContentText, DialogContent, DialogTitle, Button } from '@mui/material';


import { setShowModalTaskInfo, setShowModalUpdateTask } from '../../reducers/modalPopupSlice';
import { ICreatedTaskType, ModalPopupState } from '../../types';
import { useAppDispatch } from '../../hook';


type FormValues = {
  title: string;
  description: string;
};

const ModalTaskInfo = ({ task }: { task: ICreatedTaskType }) => {
  const dispatch = useAppDispatch();

  // const { showModalTaskInfo } = useSelector(
  //   (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  // );

  const updateTaskRequest = (task: ICreatedTaskType) => {
    dispatch(setShowModalUpdateTask(task));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  return (
    <div>
      <Dialog
        open={task === null ? false : true}
        onClose={() => dispatch(setShowModalTaskInfo(null))}
        className="modal-task"
      >
        <DialogTitle className="modal-task__title">
          {task.title}
        </DialogTitle>
        <DialogContent
          sx={{ width: '20rem' }}
          className="modal-task__description"
        >
          <DialogContentText id="alert-dialog-slide-description">
            {task.description}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <IconButton
        onClick={event => {
          event.stopPropagation();
          updateTaskRequest(task);
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
}

export default ModalTaskInfo;
