import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import ModalCreateTask from '../ModalCreateTask/ModalCreateTask';
import ModalDeleteTask from '../ModalDeleteTask/ModalDeleteTask';
import { setShowModalCreateTask } from '../../reducers/modalPopupSlice';

import TaskItem from './TaskItem';
import { updateTask, setCurrentTask, getTasks, setMessage } from '../../reducers/tasksSlice';
import { useAppDispatch } from '../../hook';
import {
  ColumnType,
  ITaskType,
  ITaskState,
  ModalPopupState,
  ColumnState } from '../../types';
import Spinner from '../Spinner/Spinner';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TasksList({ column }: { column: ColumnType }) {
  const dispatch = useAppDispatch();

  const param = useParams();
  const boardId = param.id;

  const columns = useSelector((state: { columns: ColumnState }) => state.columns);
  const { tasksArr, currentTaskId, isLoading, hasError, message } = useSelector((state: { tasks: ITaskState }) => state.tasks);

  const url = `/boards/${boardId}/columns/${column._id}/tasks`;

  const { showModalCreateTask, showModalDeleteTask } =
    useSelector((state: { modalPopup: ModalPopupState }) => state.modalPopup);

  useEffect(() => {
    dispatch(getTasks(url));
  }, []);
  console.log(tasksArr);
  return (
    <section className="task-list">
      <section className="task-list__items">
        {tasksArr
        .filter(task => task.columnId === column._id)
        .map((task: ITaskType) => (
          <TaskItem key={task._id} task={task} column={column} />
        ))}
      </section>
      {showModalCreateTask && <ModalCreateTask url={url} />}
      {/* {showModalUpdateTask && (
        <ModalUpdateTask url={`${url}/${currentTaskId}`} />
      )} */}
      {showModalDeleteTask && (
        <ModalDeleteTask url={`${url}/${currentTaskId}`} />
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

export default TasksList;
