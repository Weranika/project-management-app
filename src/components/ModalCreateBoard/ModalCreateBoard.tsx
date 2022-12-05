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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { setShowModalCreateBoard } from '../../reducers/modalPopupSlice';
import { createBoard } from '../../reducers/boardsSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState, BoardState } from '../../types';

type FormValues = {
  boardTitle: string;
  boardDescription: string;
};

export default function ModalCreateBoard({ url }: { url: string }) {
  const dispatch = useAppDispatch();

  const { showModalCreateBoard } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => {
    createBoardRequest(data);
  });

  const createBoardRequest = (data: FormValues) => {
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
      createBoard({
        url: url,
        title: data.boardTitle,
        description: data.boardDescription,
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
        <DialogTitle>
          <FormattedMessage id='crate_board' />
        </DialogTitle>
        <form className="createBoard__form" onSubmit={onSubmit}>
          <DialogContent sx={{ width: '25rem' }}>
            <TextField
              fullWidth
              sx={{ display: 'block', mb: '1rem' }}
              id="outlined-basic"
              label="Board title"
              variant="outlined"
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
              id="outlined-basic"
              label="Board description"
              variant="outlined"
              {...register('boardDescription')}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">
              <FormattedMessage id='submit' />
            </Button>
            <Button onClick={() => dispatch(setShowModalCreateBoard(false))}>
              <FormattedMessage id='cancel' />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
