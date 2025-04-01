import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import {
  UserDetails,
  UserAchievement,
  UserParent,
  UserTalent,
  UserAttendanceDashboard

} from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditableUser,
  setEditableUserAchievement,
  setEditableUserParent,
  setEditableUserTalent,
} from '../../slices/dashboard/dashboardSlice';
import UserAttendance from '../../components/Dashbord/UserAttendance';
let i = 0;
function UserData() {
  console.log('Rendering UserData', i++);
  const { userId } = useParams();
  const fetchUser = useCallback(() => databaseService.getUserProfile(userId), [userId]);
  const { data: user, error, loading } = useCustomReactQuery(fetchUser);
  const dispatch = useDispatch();
  dispatch(setEditableUser(user));
  dispatch(setEditableUserAchievement(user?.achievements));
  dispatch(setEditableUserParent(user?.parents));
  dispatch(setEditableUserTalent(user?.talents));

  if (userId === undefined) {
    return (
      <div>
        <h1>404 Not Found</h1>
      </div>
    );
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <UserDetails user={user} />
      <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />
      <UserAchievement />
      <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />

      <UserTalent />
      <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />
      <UserParent />
      <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />
      <UserAttendanceDashboard />
    </>
  );
}

export default UserData;
