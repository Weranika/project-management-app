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
import { useNavigate } from 'react-router-dom';

export default function BoardItem({ board }: { board: BoardType }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    <div className="boardItem" onClick={() => navigate(`/board/${board._id}`)}>
      <h3 className="boardItem__title">{board.title}</h3>
      <p className="boardItem__description">{board.description}</p>
      <div className="boardItem__buttonsWrapper">
        <IconButton
          sx={{ zIndex: '10' }}
          onClick={event => {
            event.stopPropagation();
            deleteBoard(board._id);
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
        <IconButton
          onClick={event => {
            event.stopPropagation();
            updateBoard(board._id);
          }}
        >
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}
