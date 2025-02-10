import React, { useCallback, useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import useCustomeReactQuery from "../../utils/useCustomReactQuery";
import { QueryHandler } from "../../components";

function AllParent() {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);

  const fetchParents = useCallback(() => databaseService.getUserParents(), []);
  const { data, loading, error } = useCustomeReactQuery(fetchParents);

  useEffect(() => {
    if (data) {
      setParents(data);
    }
  }, [data]);

  const user = useSelector((state) => state.auth.userData.firstName);

  const handleDelete = async (parentId) => {
    try {
      const response = await databaseService
        .deleteParentDetails({ parentId })
        .then((response) => response.data);
      if (response) {
        console.log(`Deleted successfully !!`);
        setParents((prevParents) => prevParents.filter((parent) => parent._id !== parentId));
      }
    } catch (error) {
      console.log("Error Deleting Parent", error);
    }
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{`${user}'s Parent Details`}</h2>

        {Array.isArray(parents) && parents.length > 0 && (
          <div className="w-full">
            {parents.map((parent) => (
              <div key={parent._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
                <p className="font-semibold">{parent.role} - {parent.fullName}</p>
                <div className="flex gap-2">
                  <Button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => navigate(`/parent/${parent._id}`)}>View</Button>
                  <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate(`/parent/edit/${parent._id}`)}>Edit</Button>
                  <Button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(parent._id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Parent Button */}
        <Button className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full md:w-auto" onClick={() => navigate("/parent/add")}>
          Add Parent
        </Button>
      </div>
    </QueryHandler>
  );
}

export default AllParent;
