import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { decodeToken } from 'react-jwt';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { setShowModalUpdateBoard } from '../../reducers/modalPopupSlice';
import { updateBoard } from '../../reducers/boardsSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState, BoardState } from '../../types';

type FormValues = {
  boardTitle: string;
  boardDescription: string;
};

export default function ModalUpdateBoard({ url }: { url: string }) {
  const { currentBoardTitle, currentBoardDescription } = useSelector(
    (state: { boards: BoardState }) => state.boards,
  );

  const dispatch = useAppDispatch();

  const { showModalUpdateBoard } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => {
    updateBoardRequest(data);
  });

  const updateBoardRequest = (data: FormValues) => {
    const jwt = localStorage.getItem('jwt');
    let userId = '';
    if (jwt) {
      const myDecodedToken: {
        id: string;
        login: string;
        iat: number;
        exp: number;
      } | null = decodeToken(jwt);
      userId = myDecodedToken ? myDecodedToken.id : '';
    }
    dispatch(
      updateBoard({
        url: url,
        title: data.boardTitle,
        description: data.boardDescription,
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
        <form className="updateBoard__form" onSubmit={onSubmit}>
          <DialogContent sx={{ width: '25rem' }}>
            <TextField
              fullWidth
              sx={{ display: 'block', mb: '1rem' }}
              id="outlined-basic"
              label="Board title"
              variant="outlined"
              defaultValue={currentBoardTitle}
              {...register('boardTitle', {
                required: 'This field is required.',
                minLength: {
                  value: 5,
                  message: 'This field should be more than 5 symbols',
                },
              })}
              helperText={errors.boardTitle && errors.boardTitle.message}
              error={errors.boardTitle ? true : false}
            />
            <TextField
              fullWidth
              defaultValue={currentBoardDescription}
              id="outlined-basic"
              label="Board description"
              variant="outlined"
              {...register('boardDescription')}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
            <Button onClick={() => dispatch(setShowModalUpdateBoard(false))}>
              <FormattedMessage id='cancel' />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
