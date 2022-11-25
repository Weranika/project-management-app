import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { decodeToken } from 'react-jwt';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { setShowModalCreateBoard } from '../../reducers/modalPopupSlice';
import { createBoard } from '../../reducers/boardsSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState, BoardState } from '../../types';

export default function ModalCreateBoard({ url }: { url: string }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const { boardsArr } = useSelector(
    (state: { boards: BoardState }) => state.boards,
  );
  const { showModalCreateBoard } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const createBoardRequest = (event: FormEvent) => {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt');
    let userId = '';
    if (jwt) {
      const myDecodedToken: {
        id: string;
        login: string;
        iat: number;
        exp: number;
      } | null = decodeToken(jwt);
      console.log('decoded', myDecodedToken);
      userId = myDecodedToken ? myDecodedToken.id : '';
    }
    dispatch(
      createBoard({
        url: url,
        title: title,
        description: description,
        owner: userId,
        users: [userId],
      }),
    );
    dispatch(setShowModalCreateBoard(false));
  };

  return (
    <div>
      <Dialog
        open={showModalCreateBoard}
        onClose={() => dispatch(setShowModalCreateBoard(false))}
      >
        <DialogTitle>Create board</DialogTitle>
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
              label="Board title"
              variant="outlined"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Board description"
              variant="outlined"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event: FormEvent) => createBoardRequest(event)}>
            Submit
          </Button>
          <Button onClick={() => dispatch(setShowModalCreateBoard(false))}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
