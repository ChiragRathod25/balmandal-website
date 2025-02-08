import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseService from "../services/database.services";
import { login as authLogin } from "../slices/userSlice/authSlice";

function Register() {
  const { register, getValues, setValue, handleSubmit } = useForm();
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  if (authStatus) navigate("/");
  
  const submit = async (data) => {
    try {
      const user = await databaseService.register(data);
      if (user) {
        console.log("Registered user", user);
        const createduser = await databaseService.getCurrentuser();
        if (createduser) {
          dispatch(authLogin({ createduser }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="First name : "
          placeholder="Enter your first name"
          {...register("firstName", { required: true })}
        />
        <Input
          label="Last name : "
          placeholder="Enter your last name"
          {...register("lastName", { required: true })}
        />
        <Input
          type="tel"
          label="Mobile Number"
          placeholder="Enter your mobile number"
          {...register("mobile", { required: true })}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter password (new)"
          {...register("password", { required: true })}
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
        />
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <Button type="Submit">Submit</Button>
      </form>
    </>
  );
}

export default Register;
