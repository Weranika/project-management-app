import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { setShowModalCreateColumn } from '../../reducers/modalPopupSlice';
import { createColumn } from '../../reducers/columnsSlice';
import { useAppDispatch } from '../../hook';
import { ModalPopupState, ColumnState } from '../../types';

type FormValues = {
  title: string;
};

export default function ModalCreateColumn({ url }: { url: string }) {
  const dispatch = useAppDispatch();
  const { columnsArr } = useSelector(
    (state: { columns: ColumnState }) => state.columns,
  );
  const { showModalCreateColumn } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => {
    createColumnRequest(data);
  });

  const createColumnRequest = (data: FormValues) => {
    dispatch(
      createColumn({
        url: url,
        title: data.title,
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
        <form className="createColumn__form" onSubmit={onSubmit}>
          <DialogContent sx={{ width: '20rem' }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Column title"
              variant="outlined"
              {...register('title', {
                required: 'This field is required.',
                minLength: {
                  value: 4,
                  message: 'This field should be more than 4 symbols',
                },
              })}
              helperText={errors.title && errors.title.message}
              error={errors.title ? true : false}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
            <Button onClick={() => dispatch(setShowModalCreateColumn(false))}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
