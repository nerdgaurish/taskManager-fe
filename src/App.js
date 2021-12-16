/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Login from "./components/Login";
import Homepage from "./Pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import Notfound from "./components/Notfound";
import AdminPage from "./components/AdminPage";
import ProtectedAdmin from "./components/ProtectedAdmin";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { setLoggedIn, setUserID } from "./reducers/userReducer";
import { parseJwt } from "./components/CommonMethods";

// eslint-disable-next-line func-names
const App = function () {
  const [isAdmin, setisAdmin] = useState(false);

  const getUserData = async (tokenID) => {
    const { username } = parseJwt(tokenID);
    const {
      data: {
        user: { role },
      },
    } = await axios.get(`http://localhost:4000/api/v1/user/${username}`, {
      headers: {
        Authorization: `Bearer ${tokenID}`,
      },
    });
    role === "admin" ? setisAdmin(true) : setisAdmin(false);
  };

  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const userStatus = localStorage.getItem("token");
    if (userStatus) {
      dispatch(setLoggedIn());
      getUserData(userStatus);
    }

    const userData = localStorage.getItem("users");
    if (userData) {
      dispatch(setUserID(userData));
    }
  }, [isLoggedIn]);
  const redirectTo = () => {
    if (isAdmin) {
      return <Redirect to="/admin" />;
    }
    if (isLoggedIn) {
      return <Redirect to="/tasks" />;
    }
    return <Login />;
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {redirectTo}
        </Route>
        <ProtectedRoute path="/tasks" component={Homepage} />
        <ProtectedAdmin path="/admin" component={AdminPage} />
        <ProtectedAdmin path="/admin/add-user" component={AdminPage} />
        <Route>
          <Notfound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
