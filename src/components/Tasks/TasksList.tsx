import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import TaskItem from './TaskItem';
import { updateTask, setCurrentTask, getTasks } from '../../reducers/tasksSlice';
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
  const { tasksArr, isLoading, hasError, message } = useSelector((state: { tasks: ITaskState }) => state.tasks);

  const url = `/boards/${boardId}/columns/${column._id}/tasks`;

  useEffect(() => {
    dispatch(getTasks(url));
  }, []);

  return (
    <section className="task-list__page">
      <section className="task-list__items">
        {isLoading ? (
          <Spinner />
        ) : (
          tasksArr.map((task: ITaskType) => {
            return <TaskItem key={task._id} task={task} column={column} />;
          })
        )}
      </section>
    </section>
  );
}

export default TasksList;
