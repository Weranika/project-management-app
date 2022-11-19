import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Column from '../../Column/Column';
import './Board.scss';

import ModalCreateColumn from '../../ModalCreateColumn/ModalCreateColumn';
import ModalDeleteColumn from '../../ModalDeleteColumn/ModalDeleteColumn';
import { ColumnType, columnState, modalPopupState } from '../../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hook';
import { setShowModalCreateColumn } from '../../../reducers/modalPopupSlice';
import { getColumns } from '../../../reducers/columnsSlice';

function Board() {
  const dispatch = useAppDispatch();
  const { showModalCreateColumn, showModalDeleteColumn } = useSelector(
    (state: { modalPopup: modalPopupState }) => state.modalPopup,
  );
  const { columnsArr, currentColumnId } = useSelector(
    (state: { columns: columnState }) => state.columns,
  );

  useEffect(() => {
    const url = `/boards/636fcdd30cb48a0c4248c4b4/columns`;
    dispatch(getColumns(url));
  }, []);

  return (
    <main className="board">
      <section className="board__page">
        <h1 className="board__title">Board page</h1>
        <section className="board__columns">
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
        )}
      </section>
    </main>
  );
}

export default Board;
