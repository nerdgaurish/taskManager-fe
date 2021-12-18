/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Notfound = () => {
  const history = useHistory();
  return (
    <Div>
      Sorry! This page does not exists
      <Button onClick={() => history.push('/')}>GoBack</Button>
    </Div>
  );
};

export default Notfound;
