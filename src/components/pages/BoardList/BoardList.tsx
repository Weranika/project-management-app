import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import BoardItem from '../../BoardItem/BoardItem';
import ModalCreateBoard from '../../ModalCreateBoard/ModalCreateBoard';
import ModalUpdateBoard from '../../ModalUpdateBoard/ModalUpdateBoard';
import ModalDeleteBoard from '../../ModalDeleteBoard/ModalDeleteBoard';
import { setShowModalCreateBoard } from '../../../reducers/modalPopupSlice';
import { getBoards, setMessage } from '../../../reducers/boardsSlice';
import { useAppDispatch } from '../../../hook';
import { BoardType, BoardState, ModalPopupState } from '../../../types';
import Spinner from '../../Spinner/Spinner';

import './BoardList.scss';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BoardList() {
  const dispatch = useAppDispatch();

  const { showModalCreateBoard, showModalDeleteBoard, showModalUpdateBoard } =
    useSelector((state: { modalPopup: ModalPopupState }) => state.modalPopup);

  const { boardsArr, currentBoardId, isLoading, hasError, message } =
    useSelector((state: { boards: BoardState }) => state.boards);

  const url = `/boards`;

  useEffect(() => {
    dispatch(getBoards(url));
  }, []);

  return (
    <section className="boardList__page">
      <div className="boardList__header">
        <h1 className="boardList__title">
          <FormattedMessage id="boards" />
        </h1>
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

export default BoardList;
