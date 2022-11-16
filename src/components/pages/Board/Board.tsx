import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './Board.scss';
import axiosConfig from '../../../util/axiosConfig';
import ModalCreateColumn from '../../ModalCreateColumn/ModalCreateColumn';
import ModalDeleteColumn from '../../ModalDeleteColumn/ModalDeleteColumn';
import { Column, columnState, modalPopupState } from '../../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hook';
//import Button from '@mui/material/Button';
import {
  setShowModalCreateColumn,
  setShowModalDeleteColumn,
} from '../../../reducers/modalPopupSlice';
import { getColumns } from '../../../reducers/columnsSlice';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

function Board() {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const [currentColumn, setCurrentColumn] = useState('');
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const { showModalCreateColumn, showModalDeleteColumn } = useSelector(
    (state: { modalPopup: modalPopupState }) => state.modalPopup,
  );
  const { columnsArr } = useSelector(
    (state: { columns: columnState }) => state.columns,
  );

  useEffect(() => {
    const url = `/boards/636fcdd30cb48a0c4248c4b4/columns`;
    dispatch(getColumns(url));
  }, []);

  const deleteColumn = (colId: string) => {
    dispatch(setShowModalDeleteColumn(true));
    setCurrentColumn(colId);
  };

  return (
    <main className="board">
      <section className="board__page">
        <h1 className="board__title">Board page</h1>
        <section className="board__columns">
          {columnsArr.map((column: Column, index: number) => {
            return (
              <div className="column" key={index}>
                <div className="column__header">
                  {editMode ? (
                    <input type="text" />
                  ) : (
                    <h3 className="column__title">{column.title}</h3>
                  )}
                  <button onClick={() => deleteColumn(column._id)}>
                    Delete
                  </button>
                </div>
                <button>Add task</button>
              </div>
            );
          })}
          {/*  <Button variant="contained">Contained</Button> */}
          {/*  <button
            onClick={() => dispatch(setShowModalCreateColumn(true))}
            className="button button--create-column"
          >
            
          </button> */}
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
            url={`/boards/636fcdd30cb48a0c4248c4b4/columns/${currentColumn}`}
          />
        )}
      </section>
    </main>
  );
}

export default Board;
