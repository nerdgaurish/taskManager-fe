/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const taskReducer = createSlice({
  name: 'taskState',
  initialState: {
    taskList: [],
  },
  reducers: {
    getAllTaskList: (state, action) => {
      state.taskList = action.payload; // JSON.stringify(action.payload);
    },
  },
});

export const { getAllTaskList } = taskReducer.actions;

export default taskReducer.reducer;
