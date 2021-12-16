/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Button, Container, TextField } from "@mui/material";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const modalStyles = {
  padding: 0.5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: 300,
  gap: 1,
};

const AddUser = (props) => {
  const { addUserhandleCloseModal } = props;

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
      role: "user",
    };
    await axios.post("http://localhost:4000/api/v1/user", userData);
    addUserhandleCloseModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container sx={modalStyles}>
        <div>
          <TextField
            type="text"
            placeholder="First name"
            {...register("firstName", { required: true, maxLength: 80 })}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="text"
            placeholder="Last name"
            {...register("lastName", { required: true, maxLength: 100 })}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="text"
            placeholder="Username"
            {...register("userName", { required: true })}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            placeholder="Password"
            {...register("password", { required: true, maxLength: 10 })}
            fullWidth
          />
        </div>
        <div>
          <Button type="submit" className="btn_submitForm">
            Add User{" "}
          </Button>
        </div>
      </Container>
    </form>
  );
};

export default AddUser;
