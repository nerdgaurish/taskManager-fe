import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const taskReducer = createSlice({
  name: 'taskState',
  initialState: {
    taskList: []
  },
  reducers: {
    getAllTaskList: (state, action) => {
        state.taskList = action.payload;// JSON.stringify(action.payload);
    }
  }
});

export const { getAllTaskList } = taskReducer.actions;



export default taskReducer.reducer;