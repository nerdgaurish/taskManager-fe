/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Container } from "@mui/material";
import React, { useState } from "react";
import { getTasks } from "./CommonMethods";
import ToDo from "./ToDo";

const UserStats = (props) => {
  const { userName, userID } = props;
  const [taskList, setTaskList] = useState(getTasks(userID));

  return (
    <Container
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}
    >
      {taskList.map((taskData) => (
        <ToDo key={taskData.id} taskData={taskData} {...props} />
      ))}
    </Container>
  );
};

export default UserStats;
