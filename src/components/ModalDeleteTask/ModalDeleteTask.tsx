import React, { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { setShowModalDeleteTask } from '../../reducers/modalPopupSlice';
import { deleteTask } from '../../reducers/tasksSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState } from '../../types';

export default function ModalDeleteTask({ url }: { url: string }) {
  const dispatch = useAppDispatch();
  const { showModalDeleteTask } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const deleteTaskRequest = (event: FormEvent) => {
    event.preventDefault();
    dispatch(deleteTask(url));
    dispatch(setShowModalDeleteTask(null));
  };
  return (
    <div>
      <Dialog
        open={showModalDeleteTask === null ? false : true}
        onClose={() => dispatch(setShowModalDeleteTask(null))}
      >
        <DialogTitle>
          <FormattedMessage id="want_to_delete_task" />
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          ></Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event: FormEvent) => deleteTaskRequest(event)}>
            <FormattedMessage id="confirm" />
          </Button>
          <Button onClick={() => dispatch(setShowModalDeleteTask(null))}>
            <FormattedMessage id="cancel" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
