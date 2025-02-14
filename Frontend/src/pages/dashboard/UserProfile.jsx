import React, { useEffect,useCallback } from 'react';
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
  const {userId} = useParams();
  const fetchUser = useCallback(() => databaseService.getUserById(userId), [userId]);
  const { data, error, loading ,refetch} = customReactQuery(fetchUser);
  const dispatch=useDispatch()

  useEffect(() => {
  
    console.log("userId",userId);
  }, [userId]);

  useEffect(() => {
    if (data) {
      console.log('set Editable User:', data);
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
  if(loading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error</div>
  }

  return (
    <>
      <UserDetails userId={userId} />
      <UserAchievement userId={userId} />
      <UserTalent userId={userId} />
      <UserParent userId={userId} />
    </>
  );
}

export default UserData;
