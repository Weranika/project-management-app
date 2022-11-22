import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { setShowModalCreateColumn } from '../../reducers/modalPopupSlice';
import { createColumn } from '../../reducers/columnsSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState, ColumnState } from '../../types';

export default function ModalCreateColumn({ url }: { url: string }) {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const { columnsArr } = useSelector(
    (state: { columns: ColumnState }) => state.columns,
  );
  const { showModalCreateColumn } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const createColumnRequest = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      createColumn({
        url: url,
        title: title,
        order: columnsArr.length,
      }),
    );
    dispatch(setShowModalCreateColumn(false));
  };

  return (
    <div>
      <Dialog
        open={showModalCreateColumn}
        onClose={() => dispatch(setShowModalCreateColumn(false))}
      >
        <DialogTitle>Create column</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Column title"
              variant="outlined"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event: FormEvent) => createColumnRequest(event)}>
            Submit
          </Button>
          <Button onClick={() => dispatch(setShowModalCreateColumn(false))}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
