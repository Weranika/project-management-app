import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import BoardItem from '../../BoardItem/BoardItem';
import ModalCreateBoard from '../../ModalCreateBoard/ModalCreateBoard';
import ModalUpdateBoard from '../../ModalUpdateBoard/ModalUpdateBoard';
import ModalDeleteBoard from '../../ModalDeleteBoard/ModalDeleteBoard';
import {
  setShowModalCreateBoard,
  setShowModalUpdateBoard,
} from '../../../reducers/modalPopupSlice';
import { getBoards } from '../../../reducers/boardsSlice';
import { useAppDispatch } from '../../../hook';
import { BoardType, BoardState, ModalPopupState } from '../../../types';

import './BoardList.scss';
import Spinner from '../../Spinner/Spinner';

function BoardList() {
  const dispatch = useAppDispatch();
  const { showModalCreateBoard, showModalDeleteBoard, showModalUpdateBoard } =
    useSelector((state: { modalPopup: ModalPopupState }) => state.modalPopup);
  const { boardsArr, currentBoardId, isLoading, hasError } = useSelector(
    (state: { boards: BoardState }) => state.boards,
  );
  const url = `/boards`;

  useEffect(() => {
    dispatch(getBoards(url));
  }, []);

  return (
    <section className="boardList__page">
      <div className="boardList__header">
        <h1 className="boardList__title">Boards</h1>

        <Button
          variant="contained"
          onClick={() => dispatch(setShowModalCreateBoard(true))}
        >
          + Add board
        </Button>
      </div>

      <section className="boardList__boardItems">
        {isLoading ? (
          <Spinner />
        ) : (
          boardsArr.map((board: BoardType) => {
            return <BoardItem key={board._id} board={board} />;
          })
        )}
      </section>
      {showModalCreateBoard && <ModalCreateBoard url={url} />}
      {showModalUpdateBoard && (
        <ModalUpdateBoard url={`${url}/${currentBoardId}`} />
      )}
      {showModalDeleteBoard && (
        <ModalDeleteBoard url={`${url}/${currentBoardId}`} />
      )}
    </section>
  );
}

export default BoardList;
