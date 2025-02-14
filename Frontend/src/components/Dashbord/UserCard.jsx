import React from 'react';
import { Button } from '../';
import { useNavigate } from 'react-router-dom';
function UserCard({ user }) {
  const navigate = useNavigate();
  console.log(user)
  return (
    <>
      <div className="card bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center space-y-4">
        <div className="card-avatar">
          <img src={user?.avatar || `https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-m
              ale-avatar-icon-png.png`} alt="avatar" className="w-32 h-32 rounded-full" />
        </div>
        <div className="card-body">
          <div>
            <p>
              <span className="font-semibold">First Name:</span> {user?.firstName}
            </p>
            <p>
              <span className="font-semibold">Last Name:</span> {user?.lastName}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Standard:</span> {user.std}
            </p>
            <p>
              <span className="font-semibold">Medium of Study:</span> {user?.mediumOfStudy}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Mobile:</span> {user?.mobile}
            </p>
          </div>
          <Button onClick={() => navigate(`/dashboard/user/${user?._id}`)}>View Details</Button>
        </div>
      </div>
    </>
  );
}

export default UserCard;
