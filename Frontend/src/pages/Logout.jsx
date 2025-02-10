import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import databaseService from '../services/database.services';
import { logout } from '../slices/userSlice/authSlice';

function Logout() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  if (!authStatus) navigate('/login');
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if (authStatus) navigate('/login');
      databaseService
        .logout()
        .then(() => {
          dispatch(logout());
          navigate('/login');
        })
        .catch((error) => {
          console.error('Logout Error', error);
        });
    } catch (error) {
      console.error('Logout Error', error);
    }
  }, [authStatus, navigate]);

  return <>Logging out...</>;
}

export default Logout;
