import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import UserAchievement from './UserAchievement';
import UserTalent from './UserTalent';

function UserData() {
  const userId = useParams();

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  return (
  <>
    <UserAchievement userId={userId} /> 
    <UserTalent userId={userId} />
  </>
  )
}

export default UserData;
