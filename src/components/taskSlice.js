import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "taskCount",
  initialState: {
    value: "",
  },
  reducers: {
    searchTaskValue: (state, action) => {
      console.log(state, action);
    },
  },
});

export const { searchTaskValue } = taskSlice.actions;

export default taskSlice.reducer;
