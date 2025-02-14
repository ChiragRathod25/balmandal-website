import React, { useState } from 'react';
import UserDetails from './UserDetails';
import { useSelector } from 'react-redux';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import EditUserDetails from './EditUserDetails';

function UserProfile() {
  const userId = useSelector((state) => state.auth.userData._id);
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);

  return (
    <>
      {isEditing ? <EditUserDetails setEditing={setEditing} /> : <UserDetails userId={userId} />}
      <div className="container mx-auto flex justify-between items-center">
        <Button
          onClick={() => navigate('/talent')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          My Talents
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/achievement')}
        >
          My Achievements
        </Button>
        <Button
          onClick={() => navigate('/parent')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          My Parent Details
        </Button>
      </div>
    </>
  );
}

export default UserProfile;
