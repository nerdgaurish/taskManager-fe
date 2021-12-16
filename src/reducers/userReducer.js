/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "userstate",
  initialState: {
    isLoggedIn: false,
    userData: {
      uID: "",
      role: "",
      isAdmin: false,
    },
    isDoneFilter: false,
  },
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userData = {
        uID: "",
        role: "",
        isAdmin: false,
      };
    },
    setUserID: (state, action) => {
      state.userData = action.payload;
    },
    setIsDoneFilter: (state) => {
      state.isDoneFilter = true;
    },
    removeIsDoneFilter: (state) => {
      state.isDoneFilter = false;
    },
  },
});

export const {
  setLoggedIn,
  setLoggedOut,
  setUserID,
  setIsDoneFilter,
  removeIsDoneFilter,
} = userReducer.actions;

export default userReducer.reducer;
