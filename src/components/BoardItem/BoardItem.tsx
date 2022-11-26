import React from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { setShowModalDeleteBoard } from '../../reducers/modalPopupSlice';
import { setShowModalUpdateBoard } from '../../reducers/modalPopupSlice';
import {
  setCurrentBoard,
  setCurrentBoardDescription,
  setCurrentBoardTitle,
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
  const updateBoard = (boardId: string) => {
    dispatch(setShowModalUpdateBoard(true));
    dispatch(setCurrentBoard(boardId));
    dispatch(setCurrentBoardTitle(board.title));
    dispatch(setCurrentBoardDescription(board.description));
  };
  return (
    <div className="boardItem">
      <h3 className="boardItem__title">{board.title}</h3>
      <p className="boardItem__description">{board.description}</p>
      <div className="boardItem__buttonsWrapper">
        <IconButton onClick={() => deleteBoard(board._id)}>
          <DeleteForeverIcon />
        </IconButton>
        <IconButton onClick={() => updateBoard(board._id)}>
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}
