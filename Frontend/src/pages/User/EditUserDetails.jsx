import React from 'react';
import { useSelector } from 'react-redux';
import { UserDetailsForm } from '../../components';

function EditUserDetails({ setEditing }) {
  const user = useSelector((state) => state.auth.userData);
  console.log('EditUserDetails Component', user);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <UserDetailsForm user={user} setEditing={setEditing} />
      </div>
    </div>
  );
}

export default EditUserDetails;
