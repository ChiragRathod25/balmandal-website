import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '../components';
import databaseService from '../services/database.services';
import { login } from '../slices/userSlice/authSlice';

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus) navigate('/');
  }, [authStatus, navigate]);

  const submit = async (data) => {
    try {
      const session = await databaseService.login(data);

      if (session) {
        const user = await databaseService.getCurrentuser();

        if (user) {
          dispatch(login(user.data));
        }
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <Input
            label="First name : "
            placeholder="Enter your first name"
            {...register('firstName', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <Input
            type="tel"
            label="Mobile Number"
            placeholder="Enter your mobile number"
            {...register('mobile', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            {...register('password', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
          <Button
            type="Submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </Button>
        </form>
        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
