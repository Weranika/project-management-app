import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import TaskItem from './TaskItem';
import {  setMessage } from '../../reducers/tasksSlice';
import { useAppDispatch } from '../../hook';
import {
  ColumnType,
  ICreatedTaskType,
  ITaskState} from '../../types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TasksList({ column }: { column: ColumnType }) {
  const dispatch = useAppDispatch();

  const { tasksArr, hasError, message } = useSelector((state: { tasks: ITaskState }) => state.tasks);

  return (
    <section className="task-list">
      <section className="task-list__items">
        {tasksArr
        .filter(task => task.columnId === column._id)
        .map((task: ICreatedTaskType) => (
          <TaskItem key={task._id} task={task} column={column} />
        ))}
      </section>

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
