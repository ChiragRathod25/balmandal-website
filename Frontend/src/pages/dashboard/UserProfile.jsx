import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import UserAchievement from './UserAchievement';
import UserTalent from './UserTalent';
import UserParent from './UserParent';
import UserDetails from './UserDetails';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { useDispatch,useSelector } from 'react-redux';
import { setEditableUser } from '../../slices/dashboard/dashboardSlice';
let i=0;
function UserData() {
  console.log('Rendering UserData',i++);
  const { userId } = useParams();
  const fetchUser = useCallback(() => databaseService.getUserProfile(userId), [userId]);
  const { data: user, error, loading } = useCustomReactQuery(fetchUser);
  const dispatch = useDispatch();

  dispatch(setEditableUser(user));

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
      <UserAchievement achievements={user.achievements} />
      <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />

      <UserTalent talents={user.talents} />
      <hr className="border-t-2 border-gray-300 mx-auto w-11/12" />
      <UserParent parents={user.parents} />
    </>
  );
}

export default UserData;
