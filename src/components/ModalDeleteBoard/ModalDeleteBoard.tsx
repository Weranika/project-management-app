import React, { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { setShowModalDeleteBoard } from '../../reducers/modalPopupSlice';
import { deleteBoard } from '../../reducers/boardsSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState } from '../../types';

export default function ModalDeleteBoard({ url }: { url: string }) {
  const dispatch = useAppDispatch();
  const { showModalDeleteBoard } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const deleteBoardRequest = (event: FormEvent) => {
    event.preventDefault();
    dispatch(deleteBoard(url));
    dispatch(setShowModalDeleteBoard(false));
  };
  return (
    <div>
      <Dialog
        open={showModalDeleteBoard}
        onClose={() => dispatch(setShowModalDeleteBoard(false))}
      >
        <DialogTitle>Do you really want to delete the board?</DialogTitle>
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
          <Button onClick={(event: FormEvent) => deleteBoardRequest(event)}>
            Submit
          </Button>
          <Button onClick={() => dispatch(setShowModalDeleteBoard(false))}>
            <FormattedMessage id='cancel' />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
