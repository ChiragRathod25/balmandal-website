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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(submit)} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Input
          label="First name : "
          placeholder="Enter your first name"
          {...register("firstName", { required: true })}
          className="mb-4"
        />
        <Input
          label="Last name : "
          placeholder="Enter your last name"
          {...register("lastName", { required: true })}
          className="mb-4"
        />
        <Input
          type="tel"
          label="Mobile Number"
          placeholder="Enter your mobile number"
          {...register("mobile", { required: true })}
          className="mb-4"
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter password (new)"
          {...register("password", { required: true })}
          className="mb-4"
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
          className="mb-4"
        />
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <Button type="Submit" className="w-full mt-4">Submit</Button>
      </form>
    </div>
  );
}

export default Register;
