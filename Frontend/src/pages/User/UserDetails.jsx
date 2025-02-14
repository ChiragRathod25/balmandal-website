import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import databaseService from '../../services/database.services';
import customReactQuery from '../../utils/useCustomReactQuery';
import { Button, UserDetailsForm, UserAvatar } from '../../components';
import { useParams } from 'react-router-dom';
import { setEditableUser } from '../../slices/dashboard/dashboardSlice';

function UserDetails({ userId }) {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  let fetchUser;
  if (isAdmin) fetchUser = useCallback(() => databaseService.getUserById(userId), [userId]);
  else fetchUser = useCallback(() => databaseService.getCurrentuser(), []);

  const [user, setUser] = useState({});
  const { data, error, loading, refetch } = customReactQuery(fetchUser);
  const [isEditing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const editableUser = useSelector((state) => state.dashboard.editableUser);

  useEffect(() => {
    if (data) {
      setUser(data);
      dispatch(setEditableUser(data));
    }
  }, [data, editableUser]);

  useEffect(() => {
    refetch();
  }, [isEditing]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  if (isEditing) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <UserDetailsForm user={user} setEditing={setEditing} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-14">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Details</h2>
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>
        </div>
        <div className="flex flex-row items-center justify-around mt-4 space-x-4">
          <div className="flex flex-col items-center ">
            <UserAvatar avatar={user?.avatar} />
          </div>
          <div className="mt-4">
            <p><span className="font-semibold">First Name:</span> {user?.firstName}</p>
            <p><span className="font-semibold">Last Name:</span> {user?.lastName}</p>
            <p><span className="font-semibold">Middle Name:</span> {user?.middleName}</p>
            <p><span className="font-semibold">Email:</span> {user?.email}</p>
            <p><span className="font-semibold">Mobile:</span> {user?.mobile}</p>
            <p><span className="font-semibold">DOB:</span> {user?.DOB}</p>
            <p><span className="font-semibold">School:</span> {user?.school}</p>
            <p><span className="font-semibold">Standard:</span> {user?.std}</p>
            <p><span className="font-semibold">Medium of Study:</span> {user?.mediumOfStudy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
