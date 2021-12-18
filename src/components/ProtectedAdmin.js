/* eslint-disable no-unused-expressions */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { parseJwt } from './CommonMethods';

const ProtectedAdmin = (props) => {
  const token = localStorage.getItem('token');
  const { username } = token ? parseJwt(token) : '';

  const [isAdmin, setisAdmin] = useState(false);

  const getUserData = async () => {
    const {
      data: {
        user: { role },
      },
    } = await axios.get(`http://localhost:4000/api/v1/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    role === 'admin' ? setisAdmin(true) : setisAdmin(false);
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  if (!isAdmin) {
    return <Redirect to="/" />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
};

export default ProtectedAdmin;
