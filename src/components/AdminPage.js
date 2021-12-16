/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import AddUser from "./AddUser";
import UserStats from "./UserStats";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "#ffffff",
  border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 54,
  p: 4,
  pt: 6,
};

const AdminPage = () => {
  const location = useLocation();

  const history = useHistory();

  const [userPage, setUserPage] = useState(false);
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [addUserModal, setAddUserModal] = useState(false);

  useEffect(() => {
    location.pathname === "/admin/add-user"
      ? setAddUserModal(true)
      : setAddUserModal(false);
  }, [location]);

  const addUserOpenModal = () => {
    console.log("pok")
    setAddUserModal(true);
    history.push("/admin/add-user");
  };

  const addUserhandleCloseModal = () => {
    setAddUserModal(false);
    history.push("/admin");
  };

  // eslint-disable-next-line no-unused-vars
  const openUser = (userid, name) => {
    setUserID(userid);
    setUserName(name);
    history.push(`/admin/${name}`);
  };

  useEffect(() => {
    location.pathname === `/admin/${userName}`
      ? setUserPage(true)
      : setUserPage(false);
  }, [userName, location]);

  return (
    <>
      <Homepage addUserOpenModal={addUserOpenModal} />
      {userPage ? (
        <UserStats userName={userName} userID={userID} />
      ) : (
        <UserStats userName={userName} userID={userID} />
      )}
      <Modal
        open={addUserModal}
        onClose={addUserhandleCloseModal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={addUserModal}>
          <Box sx={style}>
            <AddUser addUserhandleCloseModal={addUserhandleCloseModal} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AdminPage;
