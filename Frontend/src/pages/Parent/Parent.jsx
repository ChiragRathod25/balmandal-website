import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";
import useCustomReactQuery from "../../utils/useCustomReactQuery";
import { QueryHandler } from "../../components";

function Parent() {
  const { parentId } = useParams();
  const [parent, setParent] = useState(null);
  const navigate = useNavigate();

  const fetchParent = useCallback(
    () => databaseService.getParentDetailsById({ parentId }),
    [parentId]
  );
  const { data, loading, error } = useCustomReactQuery(fetchParent);

  useEffect(() => {
    if (!parentId) {
      navigate("/");
      return;
    }
    if (data) {
      setParent(data);
    }
  }, [parentId, data, navigate]);

  const handleDelete = async (parentId) => {
    if (!window.confirm("Are you sure you want to delete this parent detail?")) {
      return;
    }
    try {
      await databaseService.deleteParentDetails({ parentId });
      console.log("Deleted successfully !!");
      navigate("/parent");
    } catch (error) {
      console.log("Error Deleting Parent", error);
    }
  };

  return (
    <QueryHandler queries={[{ loading, error }]}> 
      {parent ? (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Parent Details</h3>
          <hr className="mb-4" />
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Role: {parent.role}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Full Name: {parent.fullName}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Email: {parent.email}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Mobile: {parent.mobileNumber}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Occupation: {parent.occupation}</p>
          </div>
          <div className="flex space-x-4">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate(`/parent/edit/${parent._id}`)}
            >
              Edit Parent
            </Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => handleDelete(parent._id)}
            >
              Delete Parent
            </Button>
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/parent")}
            >
              Manage Parents
            </Button>
          </div>
        </div>
      ) : null}
    </QueryHandler>
  );
}

export default Parent;