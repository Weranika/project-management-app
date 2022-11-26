import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

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

function BoardList() {
  const dispatch = useAppDispatch();
  const { showModalCreateBoard, showModalDeleteBoard, showModalUpdateBoard } =
    useSelector((state: { modalPopup: ModalPopupState }) => state.modalPopup);
  const { boardsArr, currentBoardId } = useSelector(
    (state: { boards: BoardState }) => state.boards,
  );

  useEffect(() => {
    const url = `/boards`;
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
        {boardsArr.map((board: BoardType) => {
          return <BoardItem key={board._id} board={board} />;
        })}
      </section>
      {showModalCreateBoard && <ModalCreateBoard url="/boards" />}
      {showModalUpdateBoard && (
        <ModalUpdateBoard url={`/boards/${currentBoardId}`} />
      )}
      {showModalDeleteBoard && (
        <ModalDeleteBoard url={`/boards/${currentBoardId}`} />
      )}
      {/* <section className="board__columns">
          {columnsArr.map((column: ColumnType) => {
            return <Column key={column._id} column={column} />;
          })}
          <div>
            <Button
              variant="contained"
              onClick={() => dispatch(setShowModalCreateColumn(true))}
            >
              + Add column
            </Button>
          </div>
        </section>
        {showModalCreateColumn && (
          <ModalCreateColumn url="/boards/636fcdd30cb48a0c4248c4b4/columns" />
        )}
        {showModalDeleteColumn && (
          <ModalDeleteColumn
            url={`/boards/636fcdd30cb48a0c4248c4b4/columns/${currentColumnId}`}
          />
        )} */}
    </section>
  );
}

export default BoardList;
