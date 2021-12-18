/* eslint-disable no-unused-expressions */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import {
  Container, Tab, Tabs, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import TodayIcon from '@mui/icons-material/Today';
import ListIcon from '@mui/icons-material/List';
import GridOnIcon from '@mui/icons-material/GridOn';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { useSelector, useDispatch } from 'react-redux';
import AddTaskModal from './AddTaskModal';
import ToDo from './ToDo';
import Calender from './Calender';
import Primeui from '../Pages/Primeui';
import { arrayCheck } from './CommonMethods';
import { fetchTasksData1, setTaskDoneByID } from '../reducers/taskActionCreator';

// eslint-disable-next-line func-names
const TabPanel = function (props) {
  // eslint-disable-next-line react/prop-types
  const {
    children, value, index, ...other
  } = props;
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
  const { searchTask } = props;

  const [value, setValue] = useState(0);
  const [filteredResults, setFilteredResults] = useState();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const isDone = useSelector((state) => state.userState.isDoneFilter);
  const { uID: userID } = useSelector((state) => state.userState.userData);
  const taskListState = useSelector((state) => state.task.taskList);
  const taskList = taskListState.tasks;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // set todo done
  const checkDone = async (id) => {
    const task = taskList.filter((taskEl) => taskEl._id === id);
    await dispatch(setTaskDoneByID(id, !task[0].isDone));
    await dispatch(fetchTasksData1(userID));
  };

  const columns = [
    { field: 'taskName', header: 'Task' },
    { field: 'taskDesc', header: 'Description' },
    { field: 'taskDate', header: 'date' },
  ];

  useEffect(() => {
    if (arrayCheck(taskList)) {
      isDone
        ? setFilteredResults(taskList.filter((task) => (
          task.isDone === isDone && task.taskName.includes(searchTask)
        )))
        : setFilteredResults(taskList.filter((task) => task.taskName.includes(searchTask)));
      setLoading(false);
    }
  }, [taskListState, isDone, searchTask]);

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
          <AddTaskModal {...props} showSuccess={showSuccess} />
          <Container
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
          >
            { loading ? <ProgressSpinner />
              : filteredResults.map((taskData) => (
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
        <Primeui itemsData={taskList} columns={columns} />
      </TabPanel>
    </>
  );
};

export default TabMenuListBar;
