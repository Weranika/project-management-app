import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Column from '../../Column/Column';
import ModalCreateColumn from '../../ModalCreateColumn/ModalCreateColumn';
import ModalDeleteColumn from '../../ModalDeleteColumn/ModalDeleteColumn';
import { setShowModalCreateColumn } from '../../../reducers/modalPopupSlice';
import { getColumns } from '../../../reducers/columnsSlice';
import { useAppDispatch } from '../../../hook';
import { ColumnType, ColumnState, ModalPopupState } from '../../../types';

import Button from '@mui/material/Button';
import './Board.scss';

function Board() {
  const dispatch = useAppDispatch();
  const { showModalCreateColumn, showModalDeleteColumn } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );
  const { columnsArr, currentColumnId } = useSelector(
    (state: { columns: ColumnState }) => state.columns,
  );

  useEffect(() => {
    const url = `/boards/636fcdd30cb48a0c4248c4b4/columns`;
    dispatch(getColumns(url));
  }, []);

  return (
    <main className="board">
      <section className="board__page">
        <h1 className="board__title">
          <FormattedMessage id='board_page' />
        </h1>
        <section className="board__columns">
          {columnsArr.map((column: ColumnType) => {
            return <Column key={column._id} column={column} />;
          })}
          <div>
            <Button
              variant="contained"
              onClick={() => dispatch(setShowModalCreateColumn(true))}
            >
              <FormattedMessage id='add_column' />
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
};

export default Board;
