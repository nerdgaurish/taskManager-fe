/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styles } from "./ToDo";

const UserCard = (props) => {
  const { First_name, Last_name, uID, delUser, Username, openUser } = props;

  return (
    <Card sx={styles.card}>
      <Grid sx={{ ...styles.innerCard }}>
        <CardContent sx={styles.cardContainer}>
          <Avatar alt={First_name} src={props.Avatar} />
          <Grid>
            <Typography variant="h5" fontWeight="bold">
              {First_name} {Last_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              @{Username}
            </Typography>
          </Grid>
          <Grid sx={styles.cardIconSection}>
            <DeleteIcon
              onClick={() => delUser(uID)}
              style={{ cursor: "pointer" }}
            />
            <ChevronRightIcon
              onClick={() => openUser(uID, Username)}
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </CardContent>
      </Grid>
    </Card>
  );
};

export default UserCard;
