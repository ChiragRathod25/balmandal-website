import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import databaseService from '../services/database.services';
import { logout } from '../slices/userSlice/authSlice';

function Logout() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus) {
      databaseService.logout().then(() => {
        dispatch(logout());
        navigate('/login');
      }).catch((error) => {
        console.error('Logout Error', error);
      });
    } else {
      navigate('/login');
    }
  }, [authStatus, navigate, dispatch]);

  return <>Logging out...</>;
}

export default Logout;
