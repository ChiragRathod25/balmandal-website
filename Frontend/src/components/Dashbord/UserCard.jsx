import React from 'react';
import { Button } from '../';
import { useNavigate } from 'react-router-dom';

function UserCard({ user }) {
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
      <div className="w-32 h-32">
        <img
          src={user?.avatar || `https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png`}
          alt="avatar"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-[#C30E59]">{user?.firstName} {user?.lastName}</p>
        <p className="text-sm text-gray-600">Standard: {user.std}</p>
        <p className="text-sm text-gray-600">Medium of Study: {user?.mediumOfStudy}</p>
        <p className="text-sm text-gray-600">Mobile: {user?.mobile}</p>
      </div>
      <Button
        onClick={() => navigate(`/dashboard/user/${user?._id}`)}
        className="bg-[#C30E59] text-white hover:bg-[#E82561] mt-4"
      >
        View Details
      </Button>
    </div>
  );
}

export default UserCard;
