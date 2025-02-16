import React, { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import { useSelector } from 'react-redux';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import useCustomeReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';

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
      console.log('Error Deleting Parent', error);
    }
  };
  const handleAdd = (role) => {
    navigate('/parent/add?role=' + role);
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto ">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{`${user}'s Parent Details`}</h2>

        {/* Parent List */}
        {Array.isArray(parents) && parents.length > 0 ? (
          <div className="w-full">
            {parents.map((parent) => (
              <div
                key={parent._id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4 lg:flex-row flex-col text-center lg:text-left"
              >
                {/* Parent Info */}
                <p className="font-semibold text-lg text-center sm:text-left">{`${parent.role} - ${parent.fullName}`}</p>

                {/* Action Buttons */}
                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-center sm:justify-end">
                  <Button
                    onClick={() => navigate(`/parent/${parent._id}`)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => navigate(`/parent/edit/${parent._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(parent._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No parent details available.</p>
        )}

        {
          parents.length < 2 && 
          parents.filter((parent)=>parent.role ==='Father').length === 0 &&
          <div className="w-full flex justify-center mt-6">
            <Button
              onClick={() => handleAdd('Father')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Add Father
            </Button>
          </div>
        }

        {
          parents.length < 2 &&
          parents.filter((parent)=>parent.role ==='Mother').length === 0 &&
          <div className="w-full flex justify-center mt-6">
            <Button
              onClick={() => handleAdd('Mother')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Add Mother
            </Button>
          </div>
        }
      </div>
    </QueryHandler>
  );
}

export default AllParent;
