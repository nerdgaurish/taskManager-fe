/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  Card, CardContent, Checkbox, Grid, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const styles = {
  card: {
    width: 475,
    paddingTop: 1,
    padding: 1,
    marginBottom: 3,
    marginLeft: 0,
    backgroundColor: '#fafafa',
  },
  innerCard: {
    maxWidth: 475,
    minWidth: 275,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardIconSection: {
    marginTop: -2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ToDo = (props) => {
  const {
    taskData, updateTask, delModalOpen, checkDone,
  } = props;

  const todoColor = (date) => {
    if (new Date(date).toLocaleDateString() < new Date().toLocaleDateString()) {
      return 'hsl(358,62%,52%)';
    }
    if (new Date(date).toLocaleDateString() > new Date().toLocaleDateString()) {
      return 'hsl(206,100%,40%)';
    }
    return 'hsl(140,40%,55%)';
  };

  return (
    <Card sx={styles.card}>
      <Grid
        sx={{
          ...styles.innerCard,
          borderLeft: `3px solid ${todoColor(taskData.taskDate)}`,
        }}
      >
        <CardContent sx={styles.cardContainer}>
          <Grid>
            <Typography variant="h5" fontWeight="bold">
              {taskData.taskName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {taskData.taskDesc}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color={todoColor(taskData.taskDate)}
            >
              {new Date(taskData.taskDate).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid sx={styles.cardIconSection}>
            <Checkbox
              {...label}
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 30,
                  color: `${todoColor(taskData.taskDate)}`,
                },
              }}
              onChange={() => checkDone(taskData._id)}
              defaultChecked={taskData.isDone}
            />
            <EditIcon onClick={() => updateTask(taskData._id)} />
            <DeleteIcon onClick={() => delModalOpen(taskData._id)} />
          </Grid>
        </CardContent>
      </Grid>
    </Card>
  );
};

export default ToDo;
