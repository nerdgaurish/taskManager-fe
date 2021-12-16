/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import Primeui from "./Primeui";
import TabMenuListBar from "../components/TabMenuListBar";
import { MemoizedHeader } from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  arrayCheck,
  getFormattedDate,
  todayDate,
  parseJwt,
} from "../components/CommonMethods";
import { setUserID } from "../reducers/userReducer";

//  styles
export const styles = {
  paper: {
    padding: 20,
    height: "70vh",
    width: "50%",
    margin: "30px auto",
  },
  doneTask: {
    textDecoration: "line-through",
    color: "grey",
  },
  pendingTask: {
    textDecoration: "none",
  },
};

const columns = [
  { field: "firstName", header: "First_name" },
  { field: "lastName", header: "Last_name" },
  { field: "userName", header: "Username" },
];

// eslint-disable-next-line func-names
const Homepage = function (props) {

  const token = localStorage.getItem("token");
  const { username } = token ? parseJwt(token) : "";
  const dispatch = useDispatch();

  const { uID: userID } = useSelector((state) => state.userState.userData);
  const isDoneValue = useSelector((state) => state.userState.isDoneFilter);

  const [taskList, setTaskList] = useState();
  const [task, setTask] = useState("");
  const [dateValue, setDateValue] = useState(todayDate);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [todoForm, setTodoForm] = useState(false);
  const [adminPanel, setAdminPanel] = useState("");
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState();
  const [isDone, setIsDone] = useState(isDoneValue);

  const setEditingMode = (id) => {
    setTodoForm(true);
    setIsEditing(true);
    setOpenModal(true);
    setTaskId(id);
  };

  const fetchUsers = async () => {
    const {
      data: { user: usersList },
    } = await axios.get("http://localhost:4000/api/v1/user/");
    setUsers(usersList);
  };

  const fetchTasksData = async (id) => {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/tasks/${id}`,
      {
        taskName: "s",
      }
    );
    const list = data.tasks.map((i) => i);
    setTaskList(list);
  };

  const getUserData = async () => {
    const {
      data: {
        user: { _id: uID, role },
      },
    } = await axios.get(`http://localhost:4000/api/v1/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
    dispatch(setUserID({ uID, role, isAdmin }));
    fetchTasksData(uID);
  };

  const updateTask = (id) => {
    setEditingMode(id);
  };

  const delModalOpen = (id) => {
    setOpenDelModal(true);
    setTaskId(id);
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:4000/api/v1/tasks/${taskId}`);
    const result = taskList.filter((i) => i.id !== taskId);
    setTaskList(result);
  };

  const handleClose = () => {
    setOpenDelModal(false);
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    fetchTasksData(userID);
    fetchUsers();
  }, [taskList, isEditing]);

  const eventObj = (ids, taskName, date, description) => {
    const id = ids;
    const title = taskName;
    const allDay = true;
    const start = new Date(date);
    const end = new Date(date);
    const desc = description;
    return { id, title, allDay, start, end, desc };
  };

  let filteredResults = [];
  if (arrayCheck(taskList)) {
    if (isDone) {
      filteredResults = taskList.filter(
        (i) => i.taskName.includes(searchTask) && i.isDone === isDone
      );
    }
    filteredResults = taskList.filter((i) => i.taskName.includes(searchTask)); // .includes(searchTask)
  }

  const eventlist = filteredResults.map((i) =>
    eventObj(i._id, i.taskName, i.taskDate, i.taskDesc)
  );

  const updateDate = async (id, date) => {
    await axios.patch(`http://localhost:4000/api/v1/tasks/${id}`, {
      taskDate: getFormattedDate(date),
    });
  };

  const handleOnDeleteModal = (id) => {
    deleteTask(id);
    setOpenDelModal(false);
  };

  return (
    <>
      <MemoizedHeader
        setSearchTask={setSearchTask}
        searchTask={searchTask}
        isDoneFilter={isDone}
        adminPanel={adminPanel}
        setAdminPanel={setAdminPanel}
        setOpenSideBar={setOpenSideBar}
        openSideBar={openSideBar}
      />

      <Sidebar
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
        isDoneFilter={isDone}
        adminPanel={adminPanel}
        setAdminPanel={setAdminPanel}
        {...props}
      />

      {!isAdmin && (
        <TabMenuListBar
          openModal={openModal}
          setOpenModal={setOpenModal}
          taskList={taskList}
          setTaskList={setTaskList}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          taskId={taskId}
          updateTask={updateTask}
          delModalOpen={delModalOpen}
          eventlist={eventlist}
          updateDate={updateDate}
          userID={userID}
          task={task}
          setTask={setTask}
          dateValue={dateValue}
          setDateValue={setDateValue}
          setTaskId={setTaskId}
          deleteTask={deleteTask}
          searchTask={searchTask}
          isDoneFilter={isDone}
          todoForm={todoForm}
          setTodoForm={setTodoForm}
        />
      )}

      {isAdmin && <Primeui itemsData={users} columns={columns} />}

      <Dialog
        open={openDelModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete the todo from the list?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleOnDeleteModal(taskId)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Homepage;
