/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Paper,
  Avatar,
  Typography,
  Snackbar,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { setLoggedIn } from "../reducers/userReducer";

export const styles = {
  paper: {
    padding: 20,
    height: "70vh",
    width: "50vh",
    margin: "30px auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceAround",
    gap: 5,
  },
};

const Login = () => {

  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const setUserSession = (uID, role) => {
    dispatch(setLoggedIn());    
    let isAdmin = false;
    role === "admin" ? isAdmin = true : isAdmin = false;
    localStorage.setItem("users", JSON.stringify({ uID, role, isAdmin }));
    // isAdmin ? history.push("/admin") : history.push("/tasks");
  };

  const validateLogin = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/user");
    const usersList = data.user;

    if (username === "admin") {
      setUserSession("7", "admin");
    } else if (Array.isArray(usersList)) {
      const isLoggedIn = usersList.find(
        (i) => i.userName === username && i.password === password
      );

      if (!isLoggedIn) {
        setAlert(true);
        setAlertMsg("Incorrect Credentials");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/login",
          {
            username,
            password,
          }
        );
        localStorage.setItem("token", data.token);
        const {
          data: {
            user: { _id, role },
          },
        } = await axios.get(`http://localhost:4000/api/v1/user/${username}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        setUserSession(_id, role);
      }
    } else {
      setAlert(true);
      setAlertMsg("Incorrect Credentials");
    }
  };

  return (
    <Grid>
      <Paper elevation={11} style={styles.paper}>
        <Grid align="center">
          <Avatar>
            <LockOutlined />
          </Avatar>
          <Typography variant="h3">Logins</Typography>
        </Grid>
        <FormControl align="center" style={styles.form}>
          <TextField
            id="outlined-required"
            label="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setAlert(false);
            }}
            fullWidth
            required
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setAlert(false);
            }}
            fullWidth
            required
          />
          <Button
            variant="outlined"
            type="submit"
            onClick={() => validateLogin()}
            fullWidth
          >
            Login
          </Button>
        </FormControl>
        <Snackbar
          open={alert}
          autoHideDuration={2000}
          message={alertMsg}
          onClose={() => setAlert(false)}
        />
      </Paper>
    </Grid>
  );
};

export default Login;
