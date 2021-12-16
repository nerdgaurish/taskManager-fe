/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/counterSlice";
import taskCountReducer from "./components/taskSlice";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
    taskCount: taskCountReducer,
    userState: userReducer,
  },
});
