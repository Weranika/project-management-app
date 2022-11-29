import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import Column from '../../Column/Column';
import ModalCreateColumn from '../../ModalCreateColumn/ModalCreateColumn';
import ModalDeleteColumn from '../../ModalDeleteColumn/ModalDeleteColumn';
import { setShowModalCreateColumn } from '../../../reducers/modalPopupSlice';
import { getColumns } from '../../../reducers/columnsSlice';
import { useAppDispatch } from '../../../hook';
import { ColumnType, ColumnState, ModalPopupState } from '../../../types';

import './Board.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function Board() {
  const dispatch = useAppDispatch();
  const { showModalCreateColumn, showModalDeleteColumn } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );
  const { columnsArr, currentColumnId } = useSelector(
    (state: { columns: ColumnState }) => state.columns,
  );
  const params = useParams();
  const boardId = params.id;

  const navigate = useNavigate();

  useEffect(() => {
    const url = `/boards/${boardId}/columns`;
    dispatch(getColumns(url));
  }, []);

  return (
    <main className="board">
      <section className="board__page">
        <div className="board__header">
          <h1 className="board__title">Board page</h1>
          <Button
            variant="contained"
            onClick={() => dispatch(setShowModalCreateColumn(true))}
          >
            + Add column
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: '1rem' }}
            onClick={() => navigate(`/board/`)}
          >
            Back
          </Button>
        </div>

        <section className="board__columns">
          {columnsArr.map((column: ColumnType) => {
            return <Column key={column._id} column={column} />;
          })}
        </section>
        {showModalCreateColumn && (
          <ModalCreateColumn url={`/boards/${boardId}/columns`} />
        )}
        {showModalDeleteColumn && (
          <ModalDeleteColumn
            url={`/boards/${boardId}/columns/${currentColumnId}`}
          />
        )}
      </section>
    </main>
  );
}

export default Board;
