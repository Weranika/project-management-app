import React, { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { setShowModalDeleteColumn } from '../../reducers/modalPopupSlice';
import { deleteColumn } from '../../reducers/columnsSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState } from '../../types';

export default function ModalDeleteColumn({ url }: { url: string }) {
  const dispatch = useAppDispatch();
  const { showModalDeleteColumn } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const deleteColumnRequest = (event: FormEvent) => {
    event.preventDefault();
    dispatch(deleteColumn(url));
    dispatch(setShowModalDeleteColumn(false));
  };
  return (
    <div>
      <Dialog
        open={showModalDeleteColumn}
        onClose={() => dispatch(setShowModalDeleteColumn(false))}
      >
        <DialogTitle>Do you really want to delete the column?</DialogTitle>
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
          <Button onClick={(event: FormEvent) => deleteColumnRequest(event)}>
            Submit
          </Button>
          <Button onClick={() => dispatch(setShowModalDeleteColumn(false))}>
            <FormattedMessage id='cancel' />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
