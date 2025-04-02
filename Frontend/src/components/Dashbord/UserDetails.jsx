import { useEffect, useState } from 'react';
import { UserDetails as UserDetailsComponent } from '../../pages';
import { UserDetailsForm } from '..';
import { useSelector } from 'react-redux';

const UserDetails = ({user}) => {
  const [isEditing, setEditing] = useState(false);
  return user?(
    <div>
      {isEditing ? (
        <>
          <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <UserDetailsForm user={user} setEditing={setEditing} />
            </div>
          </div>
        </>
      ) : (
        <UserDetailsComponent user={user} setEditing={setEditing} />
      )}
    </div>
  ):null
};

export default UserDetails;
