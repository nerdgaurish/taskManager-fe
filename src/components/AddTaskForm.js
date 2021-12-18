/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Container, TextField } from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@mui/material/Button';

import { getFormattedDate } from './CommonMethods';
import { fetchTasksData1, addNewTask, updateTask } from '../reducers/taskActionCreator';

const getTaskErrMsg = (type) => {
  if (type === 'maxLength') {
    return 'Task name should not exceed 15 characters';
  }
  if (type === 'pattern') {
    return 'Only alphabets and number allowed';
  }
  return 'Task name is required';
};

const getDescErrMsg = (type) => {
  if (type === 'maxLength') {
    return 'Description should not exceed 50 characters';
  }
  return 'Description is required';
};

// eslint-disable-next-line func-names
const AddTaskForm = function (props) {
  const {
    isEditing, taskId, setIsEditing, setOpenModal, showSuccess,
  } = props;

  const { uID: userID } = useSelector((state) => state.userState.userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (isEditing) {
      const taskData = {
        taskName: data.taskName,
        taskDesc: data.taskDesc,
        taskDate: getFormattedDate(startDate),
      };
      dispatch(updateTask(taskId, taskData));
      setIsEditing(false);
      setOpenModal(false);
    } else {
      const taskData = {
        taskName: data.taskName,
        taskDesc: data.taskDesc,
        taskDate: getFormattedDate(startDate),
        isDone: false,
        userID,
      };
      dispatch(addNewTask(taskData));
      setOpenModal(false);
    }
    showSuccess();
    dispatch(fetchTasksData1(userID));
  };

  const taskListState = useSelector((state) => state.task.taskList);
  const taskList = taskListState.tasks;

  const fetchTask = async () => {
    const task = taskList.filter((taskEl) => taskEl._id === taskId);
    reset({
      taskName: task[0].taskName,
      taskDesc: task[0].taskDesc,
    });
    setStartDate(task[0].taskDate);
  };

  useEffect(() => {
    if (isEditing) {
      fetchTask();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 300,
        }}
      >
        <div>
          <TextField
            type="text"
            placeholder="Task"
            fullWidth
            {...register('taskName', {
              required: true,
              max: 15,
              maxLength: 15,
              pattern: /^[a-zA-Z0-9_.-]*$/i,
            })}
            helperText={errors.Task ? getTaskErrMsg(errors.Task.type) : false}
            error={!!errors.Task}
          />
        </div>
        <div>
          <TextField
            type="text"
            placeholder="Description"
            fullWidth
            {...register('taskDesc', { required: true, maxLength: 50 })}
            helperText={
              errors.Description
                ? getDescErrMsg(errors.Description.type)
                : false
            }
            error={!!errors.Description}
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              label="Date"
              format="dd/MMM/yyyy"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              disablePast
              required
              style={{ width: '100%' }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <Button
            type="submit"
            disabled={String(startDate) === 'Invalid Date'}
            className="btn_submitForm"
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </div>
      </Container>
    </form>
  );
};

export default AddTaskForm;
