import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";

function Parent() {
  console.log("Parent Component");
  const { parentId } = useParams();
  const [parent, setParent] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (parentId) {
      databaseService
        .getParentDetailsById({ parentId })
        .then((response) => setParent(response.data));
    } else {
      navigate('/');
    }
  }, [parentId]);

  return parent ? (
    <div className="container mx-auto p-4">
      <div key={parent?._id} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="mb-4">
          <p className="text-lg font-semibold">{parent.rol}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg">{parent.fullName}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg">{parent.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg">{parent.mobileNumber}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg">{parent.occupation}</p>
        </div>
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => navigate(`/parent/edit/${parent._id}`)}
        >
          {`Edit ${parent.role}'s details`}
        </Button>
      </div>
    </div>
  ) : (
    <h2 className="text-center text-2xl">Loading...</h2>
  );
}

export default Parent;
