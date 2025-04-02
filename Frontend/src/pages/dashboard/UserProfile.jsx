import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import {
  UserDetails,
  UserAchievement,
  UserParent,
  UserTalent,
  UserAttendanceDashboard,
} from "../../components";
import useCustomReactQuery from "../../utils/useCustomReactQuery";
import { useDispatch } from "react-redux";
import {
  setEditableUser,
  setEditableUserAchievement,
  setEditableUserParent,
  setEditableUserTalent,
} from "../../slices/dashboard/dashboardSlice";

function UserData() {
  const { userId } = useParams();
  const fetchUser = useCallback(() => databaseService.getUserProfile(userId), [userId]);
  const { data: user, error, loading } = useCustomReactQuery(fetchUser);
  const dispatch = useDispatch();

  // Set the user data
  useEffect(() => {
    if (user) {
      dispatch(setEditableUser(user));
      dispatch(setEditableUserAchievement(user?.achievements || []));
      dispatch(setEditableUserParent(user?.parents || []));
      dispatch(setEditableUserTalent(user?.talents || []));
    }

    // Cleanup function to reset state when unmounting
    return () => {
      dispatch(setEditableUser(null));
      dispatch(setEditableUserAchievement([]));
      dispatch(setEditableUserParent([]));
      dispatch(setEditableUserTalent([]));
    };
  }, [user, dispatch]);

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
      <UserDetails/>
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
