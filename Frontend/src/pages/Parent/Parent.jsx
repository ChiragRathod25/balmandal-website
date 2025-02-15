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
      {parent && (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Parent Details</h3>
            <hr className="border-t-2 border-gray-300 mb-6 w-3/4 mx-auto" />

            <div className="space-y-4 text-gray-700">
              <p><span className="font-semibold">Role:</span> {parent.role}</p>
              <p><span className="font-semibold">Full Name:</span> {parent.fullName}</p>
              <p><span className="font-semibold">Email:</span> {parent.email}</p>
              <p><span className="font-semibold">Mobile:</span> {parent.mobileNumber}</p>
              <p><span className="font-semibold">Occupation:</span> {parent.occupation}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => navigate(`/parent/edit/${parent._id}`)}>
                Edit Parent
              </Button>
              <Button className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(parent._id)}>
                Delete Parent
              </Button>
              <Button className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => navigate("/parent")}>
                Manage Parents
              </Button>
            </div>
          </div>
        </div>
      )}
    </QueryHandler>
  );
}

export default Parent;
