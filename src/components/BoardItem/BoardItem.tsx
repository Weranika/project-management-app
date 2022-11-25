import React from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { setShowModalDeleteBoard } from '../../reducers/modalPopupSlice';
import {
  /*  updateColumn, */ setCurrentBoard,
} from '../../reducers/boardsSlice';
import { useAppDispatch } from '../../hook';
import { BoardType } from '../../types';

import './BoardItem.scss';

export default function BoardItem({ board }: { board: BoardType }) {
  const dispatch = useAppDispatch();

  const deleteBoard = (boardId: string) => {
    dispatch(setShowModalDeleteBoard(true));
    dispatch(setCurrentBoard(boardId));
  };
  return (
    <div className="boardItem">
      <h3>{board.title}</h3>
      <p>{board.description}</p>
      <IconButton onClick={() => deleteBoard(board._id)}>
        <DeleteForeverIcon />
      </IconButton>
    </div>
  );
}
