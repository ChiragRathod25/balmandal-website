import React from "react";
import { useSelector } from "react-redux";
import { UserDetailsForm } from "../../components";

function EditUserDetails({ setEditing }) {
  const user = useSelector((state) => state.auth.userData);
  console.log("EditUserDetails Component", user);

  return (
    <div className="container mx-auto px-4 py-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl  w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Edit User Details</h2>
        <UserDetailsForm user={user} setEditing={setEditing} />
      </div>
    </div>
  );
}

export default EditUserDetails;
