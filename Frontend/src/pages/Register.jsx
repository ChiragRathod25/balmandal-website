import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import databaseService from '../services/database.services';
import { login as authLogin } from '../slices/userSlice/authSlice';

function Register() {
  const { register, getValues, setValue, handleSubmit } = useForm();
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  if (authStatus) navigate('/');

  const submit = async (data) => {
    try {
      const user = await databaseService.register(data);
      if (user) {
        console.log('Registered user', user);
        const createduser = await databaseService.getCurrentuser();
        if (createduser) {
          dispatch(authLogin({ createduser }));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4"
        >
          <Input
            label="First name : "
            placeholder="Enter your first name"
            {...register('firstName', { required: true })}
            className="mb-4"
          />
          <Input
            label="Last name : "
            placeholder="Enter your last name"
            {...register('lastName', { required: true })}
            className="mb-4"
          />
          <Input
            type="tel"
            label="Mobile Number"
            placeholder="Enter your mobile number"
            {...register('mobile', { required: true })}
            className="mb-4"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password (new)"
            {...register('password', { required: true })}
            className="mb-4"
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm password"
            className="mb-4"
          />
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          <Button type="Submit" className="w-full mt-4">
            Submit
          </Button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
