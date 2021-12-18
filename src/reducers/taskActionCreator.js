/* eslint-disable no-console */
import axios from 'axios';
import { getFormattedDate } from '../components/CommonMethods';
import { getAllTaskList } from './taskReducer';

export const fetchTasksData1 = (userID) => async (dispatches) => {
  const getData = async (id) => {
    const dataList = await fetch(`http://localhost:4000/api/v1/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => data);
    dispatches(getAllTaskList(dataList));
  };

  try {
    await getData(userID);
  } catch (error) {
    console.log(error);
  }
};

export const addNewTask = (taskdata) => async () => {
  const addTask = async (data) => {
    await axios.post('http://localhost:4000/api/v1/tasks', data);
  };

  try {
    await addTask(taskdata);
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = (taskId, taskdata) => async () => {
  const editTask = async (id, data) => {
    await axios.patch(
      `http://localhost:4000/api/v1/tasks/${id}`,
      data,
    );
  };

  try {
    await editTask(taskId, taskdata);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskByID = (taskId) => async () => {
  const deletedTask = async (id) => {
    await axios.delete(`http://localhost:4000/api/v1/tasks/${id}`);
  };

  try {
    await deletedTask(taskId);
  } catch (error) {
    console.log(error);
  }
};

export const updateDateByID = (taskId, newDate) => async () => {
  const updateDate = async (id, date) => {
    await axios.patch(`http://localhost:4000/api/v1/tasks/${id}`, {
      taskDate: getFormattedDate(date),
    });
  };

  try {
    await updateDate(taskId, newDate);
  } catch (error) {
    console.log(error);
  }
};

export const setTaskDoneByID = (taskId, isTaskDone) => async () => {
  const setDone = async (id, data) => {
    console.log(id, data);
    await axios.patch(`http://localhost:4000/api/v1/tasks/${id}`, {
      isDone: data,
    });
  };

  try {
    await setDone(taskId, isTaskDone);
  } catch (error) {
    console.log(error);
  }
};
