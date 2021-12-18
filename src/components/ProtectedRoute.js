/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const user = useSelector((state) => state.userState.userData);
  const { uID } = user;
  if (!isLoggedIn && uID === '') {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
