/* eslint-disable react-hooks/exhaustive-deps */
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
import { deleteTaskByID, fetchTasksData1, updateDateByID } from "../reducers/taskActionCreator";

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
 const { uID } = JSON.parse(localStorage.getItem("users"));
  const { username } = token ? parseJwt(token) : "";
  const dispatch = useDispatch();
  const { uID: userID } = useSelector((state) => state.userState.userData);
  const isDoneValue = useSelector((state) => state.userState.isDoneFilter);

  
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
  };

  const updateTask = (id) => {
    setEditingMode(id);
  };

  const delModalOpen = (id) => {
    setOpenDelModal(true);
    setTaskId(id);
  };

  const deleteTask = async () => {
    await dispatch(deleteTaskByID(taskId))
    await dispatch(fetchTasksData1(uID))
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
    fetchUsers();
  }, [isEditing]);



  const updateDate = async (id, date) => {
    await dispatch(updateDateByID(id, date))
    await dispatch(fetchTasksData1(uID))
  };

  const handleOnDeleteModal = (id) => {
    deleteTask(id);
    setOpenDelModal(false);
  };

  useEffect(() => {
    dispatch(fetchTasksData1(uID))
  },[])

  return (
    <>
      <MemoizedHeader
        setSearchTask={setSearchTask}
        searchTask={searchTask}
        adminPanel={adminPanel}
        setAdminPanel={setAdminPanel}
        setOpenSideBar={setOpenSideBar}
        openSideBar={openSideBar}
      />

      <Sidebar
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
        adminPanel={adminPanel}
        setAdminPanel={setAdminPanel}
        {...props}
      />

      {!isAdmin && (
        <TabMenuListBar
          openModal={openModal}
          setOpenModal={setOpenModal}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          taskId={taskId}
          updateTask={updateTask}
          delModalOpen={delModalOpen}
          updateDate={updateDate}
          userID={userID}

          dateValue={dateValue}
          setDateValue={setDateValue}
          setTaskId={setTaskId}
          deleteTask={deleteTask}
          searchTask={searchTask}
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
