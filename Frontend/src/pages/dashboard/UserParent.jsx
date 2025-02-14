import React, { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ParentForm, QueryHandler, Button } from '../../components';
import { setEditableUserParent } from '../../slices/dashboard/dashboardSlice';

function UserParent() {
  const { userId } = useParams();
  const userName = useSelector((state) => state.dashboard.editableUser?.firstName);
  const fetchUserParents = useCallback(() => databaseService.getUserParents(userId), [userId]);
  const { data, error, loading, refetch } = useCustomReactQuery(fetchUserParents);
  const dispatch = useDispatch();
  const [parents, setParents] = useState(null);
  const [add, setAdd] = useState(false);
  const editableParent = useSelector((state) => state.dashboard.editableUserParent);
  console.log('Editable Parent', editableParent);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(userId);
    console.log('Refetching');
    refetch();
  }, [userId, editableParent, add]);

  useEffect(() => {
    console.log('Data updation:', data);
    if (data) {
      setParents(data);
    }
  }, [data]);

  if (add) {
    console.log('Add', add);
    return (
      <div className="container mx-auto p-4">
        <ParentForm setAdd={setAdd} />
      </div>
    );
  }

  if (editableParent) {
    console.log('Editable Parent', editableParent);
    return (
      <div className="container mx-auto p-4">
        <ParentForm parent={editableParent} setAdd={setAdd} />
      </div>
    );
  }
  const handleDelete = async (parentId) => {
    if (!window.confirm('Are you sure want to delete parent?')) {
      return;
    }
    try {
      await databaseService.deleteParentDetails({ parentId }, userId);
      setParents((prev) => prev.filter((parent) => parent._id !== parentId));
      console.log('Parent Deleted');
    } catch (error) {
      console.error('Error deleting parent:', error);
    }
  };
  const handleEdit = (parent) => {
    dispatch(setEditableUserParent(parent));
  };
  const handleAdd = () => {
    dispatch(setEditableUserParent(null));
    setAdd(true);
  };
  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{`${userName}'s Parent Details`}</h2>

        {Array.isArray(parents) && parents.length > 0 && (
          <div className="w-full">
            {parents.map((parent) => (
              <>
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
                      onClick={() => handleEdit(parent)}
                    >
                      Edit Parent
                    </Button>
                    <Button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleDelete(parent._id)}
                    >
                      Delete Parent
                    </Button>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}

        {/* Add Parent Button */}
        <Button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full md:w-auto"
          onClick={() => handleAdd()}
        >
          Add Parent
        </Button>
      </div>
    </QueryHandler>
  );
}

export default UserParent;
