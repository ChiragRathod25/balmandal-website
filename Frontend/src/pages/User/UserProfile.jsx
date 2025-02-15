import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import EditUserDetails from "./EditUserDetails";

function UserProfile() {
  const userId = useSelector((state) => state.auth.userData._id);
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);

  return (
    <div className="container mx-auto">
      {/* User Details or Edit Mode */}
      {isEditing ? <EditUserDetails setEditing={setEditing} /> : <UserDetails userId={userId} />}

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <Button
          onClick={() => navigate("/talent")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          My Talents
        </Button>
        <Button
          onClick={() => navigate("/achievement")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          My Achievements
        </Button>
        <Button
          onClick={() => navigate("/parent")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          My Parent Details
        </Button>
      </div>
    </div>
  );
}

export default UserProfile;
