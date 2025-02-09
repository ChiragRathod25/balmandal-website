import React, { useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

function AllParent() {
  const navigate = useNavigate();
  const [parents, setParents] = useState(null);

  useEffect(() => {
    databaseService
      .getUserParents()
      .then((response) => setParents(response.data));
      console.log("useEffect");
      
  }, []);

  const user = useSelector((state) => state.auth.userData.firstName);

  const handleDelete = async (parentId) => {
    const response = await databaseService
      .deleteParentDetails({ parentId })
      .then((response) => response.data);
    if (response) {
      console.log(`Deleted successfully !!`);
      setParents((prevParents)=>prevParents.filter((parent)=>parent._id!==parentId))
    }
  };

  return parents ? (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{`${user}'s Parent Details`}</h2>
      {Array.isArray(parents) && parents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parents.map((parent) => (
            <div
              key={parent?._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="mb-2">
                <p className="font-semibold">Role: {parent.role}</p>
              </div>
              <div className="mb-2">
                <p>Mobile: {parent.mobile}</p>
              </div>
              <div className="mb-2">
                <p>Occupation: {parent.occupation}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => navigate(`/parent/edit/${parent._id}`)}
                >
                  {`Edit ${parent.role}'s details`}
                </Button>
                <Button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(parent?._id)}
                >
                  {`Delete ${parent.role}'s details`}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate("/parent/add")}
      >
        Add Parent
      </Button>
    </div>
  ) : (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Loading...</h2>
    </div>
  );
}

export default AllParent;
