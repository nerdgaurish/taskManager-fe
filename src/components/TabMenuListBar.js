/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { Container, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TodayIcon from "@mui/icons-material/Today";
import ListIcon from "@mui/icons-material/List";
import GridOnIcon from "@mui/icons-material/GridOn";
import AddTaskModal from "./AddTaskModal";
import ToDo from "./ToDo";
import Calender from "./Calender";
import Primeui from "../Pages/Primeui";
import { arrayCheck } from "./CommonMethods";

// eslint-disable-next-line func-names
const TabPanel = function (props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} centered>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

// eslint-disable-next-line react/function-component-definition
const TabMenuListBar = (props) => {
  const { isDoneFilter, taskList, searchTask } = props;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // set todo done
  const checkDone = async (id) => {
    const {
      data: { task },
    } = await axios.get(`http://localhost:4000/api/v1/tasks/task/${id}`);

    await axios.patch(`http://localhost:4000/api/v1/tasks/${id}`, {
      isDone: !task.isDone,
    });
  };

  const columns = [
    { field: "taskName", header: "Task" },
    { field: "taskDesc", header: "Description" },
    { field: "taskDate", header: "date" },
  ];

  let filteredResults;
  if (arrayCheck(taskList)) {
    if (isDoneFilter) {
      filteredResults = taskList.filter(
        (i) => i.Task.includes(searchTask) && i.isDone === isDoneFilter
      );
    }
    filteredResults = taskList.filter((i) => i.taskName);
  }

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            icon={<ListIcon />}
            iconPosition="end"
            label="List View"
            style={{ marginLeft: 10, marginRight: 10 }}
          />
          <Tab
            icon={<TodayIcon />}
            iconPosition="end"
            label="Calender"
            style={{ marginLeft: 10, marginRight: 10 }}
          />
          <Tab
            icon={<GridOnIcon />}
            iconPosition="end"
            label="Task Sheet"
            style={{ marginLeft: 10, marginRight: 10 }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <>
          <AddTaskModal {...props} />
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {arrayCheck(filteredResults) &&
              filteredResults.map((taskData) => (
                <ToDo
                  key={taskData._id}
                  taskData={taskData}
                  checkDone={checkDone}
                  {...props}
                />
              ))}
          </Container>
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Calender {...props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Primeui itemsData={filteredResults} columns={columns} />
      </TabPanel>
    </>
  );
};

export default TabMenuListBar;
