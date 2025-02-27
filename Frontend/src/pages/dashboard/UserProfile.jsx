import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import UserAchievement from './UserAchievement';
import UserTalent from './UserTalent';
import UserParent from './UserParent';
import UserDetails from './UserDetails';
import customReactQuery from '../../utils/useCustomReactQuery';
import { useDispatch } from 'react-redux';
import { setEditableUser } from '../../slices/dashboard/dashboardSlice';

function UserData() {
  const { userId } = useParams();
  const fetchUser = useCallback(() => databaseService.getUserById(userId), [userId]);
  const { data, error, loading, refetch } = customReactQuery(fetchUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setEditableUser(data));
    }
  }, [data]);

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
      <UserDetails userId={userId} />
         <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />
      <UserAchievement userId={userId} />
         <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />

      <UserTalent userId={userId} />
         <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />
      <UserParent userId={userId} />
    </>
  );
}

export default UserData;
