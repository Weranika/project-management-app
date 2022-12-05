import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import Column from '../../Column/Column';
import Spinner from '../../Spinner/Spinner';
import ModalCreateColumn from '../../ModalCreateColumn/ModalCreateColumn';
import ModalDeleteColumn from '../../ModalDeleteColumn/ModalDeleteColumn';
import {
  setShowModalCreateColumn,
} from '../../../reducers/modalPopupSlice';
import { getColumns, setMessage } from '../../../reducers/columnsSlice';
import { getTasks } from '../../../reducers/tasksSlice';
import { useAppDispatch } from '../../../hook';
import ModalUpdateTask from '../../ModalUpdateTask/ModalUpdateTask';
import ModalDeleteTask from '../../ModalDeleteTask/ModalDeleteTask';
import {
  ColumnType,
  ColumnState,
  ModalPopupState,
  BoardState,
} from '../../../types';
import './Board.scss';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Board() {
  const dispatch = useAppDispatch();
  const {
    showModalCreateColumn,
    showModalDeleteColumn,
    showModalDeleteTask,
    taskCreation
  } = useSelector(
    (state: { modalPopup: ModalPopupState }) => state.modalPopup,
  );

  const { columnsArr, currentColumnId, isLoading, hasError, message } =
    useSelector((state: { columns: ColumnState }) => state.columns);

  const { boardsArr } = useSelector(
    (state: { boards: BoardState }) => state.boards,
  );

  const params = useParams();
  const boardId = params.id as string;

  const url = `/boards/${boardId}/columns`;
  const boardTitle = boardsArr
    .filter(board => board._id === boardId)
    .map(board => board.title);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getColumns(url));
    dispatch(getTasks(`/tasksSet/${boardId}`));
  }, []);

  return (
    <section className="board">
      <div className="board__header">
        <h1 className="board__title">
          <FormattedMessage id="board_page" /> {boardTitle}
        </h1>
        <Button
          variant="contained"
          onClick={() => dispatch(setShowModalCreateColumn(true))}
        >
          <FormattedMessage id="add_column" />
        </Button>
        <Button
          variant="outlined"
          sx={{ marginLeft: '1rem' }}
          onClick={() => navigate(`/board/`)}
        >
          <FormattedMessage id="back" />
        </Button>
      </div>

      <section className="board__columns">
        {isLoading ? (
          <Spinner />
        ) : (
          columnsArr.map((column: ColumnType) => {
            return <Column key={column._id} column={column} />;
          })
        )}
      </section>
      {showModalCreateColumn && <ModalCreateColumn url={url} />}
      {showModalDeleteColumn && (
        <ModalDeleteColumn url={`${url}/${currentColumnId}`} />
      )}

      { taskCreation && <ModalUpdateTask task={taskCreation} url={`${url}/${taskCreation.columnId}/tasks/${taskCreation._id}`} /> }
      {
        showModalDeleteTask && (
          <ModalDeleteTask url={`${url}/${showModalDeleteTask.columnId}/tasks/${showModalDeleteTask._id}`} />
        )
      }
      <Snackbar
        open={message ? true : false}
        autoHideDuration={5000}
        onClose={() => dispatch(setMessage(''))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        key={'bottomright'}
      >
        <Alert
          onClose={() => dispatch(setMessage(''))}
          severity={hasError ? 'error' : 'success'}
          sx={{ width: '100%', fontSize: '1rem' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </section>
  );
}

export default Board;
