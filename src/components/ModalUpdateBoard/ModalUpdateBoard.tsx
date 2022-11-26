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

import { setShowModalUpdateBoard } from '../../reducers/modalPopupSlice';
import { updateBoard } from '../../reducers/boardsSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState, BoardState } from '../../types';

export default function ModalUpdateBoard({ url }: { url: string }) {
  const { currentBoardTitle, currentBoardDescription } = useSelector(
    (state: { boards: BoardState }) => state.boards,
  );
  const [title, setTitle] = useState(currentBoardTitle);
  const [description, setDescription] = useState(currentBoardDescription);

  const dispatch = useAppDispatch();
  const { boardsArr } = useSelector(
    (state: { boards: BoardState }) => state.boards,
  );
  const { showModalUpdateBoard } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const updateBoardRequest = (event: FormEvent) => {
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
      updateBoard({
        url: url,
        title: title,
        description: description,
        owner: userId,
        users: [userId],
      }),
    );
    dispatch(setShowModalUpdateBoard(false));
  };

  return (
    <div>
      <Dialog
        open={showModalUpdateBoard}
        onClose={() => dispatch(setShowModalUpdateBoard(false))}
      >
        <DialogTitle>Update board</DialogTitle>
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
          <Button onClick={(event: FormEvent) => updateBoardRequest(event)}>
            Submit
          </Button>
          <Button onClick={() => dispatch(setShowModalUpdateBoard(false))}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
