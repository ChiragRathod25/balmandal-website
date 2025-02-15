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
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [userId, editableParent, add]);

  useEffect(() => {
    if (data) {
      setParents(data);
    }
  }, [data]);

  if (add) {
    return (
      <div className="container mx-auto p-4">
        <ParentForm setAdd={setAdd} />
      </div>
    );
  }

  if (editableParent) {
    return (
      <div className="container mx-auto p-4">
        <ParentForm parent={editableParent} setAdd={setAdd} />
      </div>
    );
  }

  const handleDelete = async (parentId) => {
    if (!window.confirm('Are you sure you want to delete this parent?')) {
      return;
    }
    try {
      await databaseService.deleteParentDetails({ parentId }, userId);
      setParents((prev) => prev.filter((parent) => parent._id !== parentId));
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
        <h2 className="text-2xl font-bold mb-6">{`${userName}'s Parent Details`}</h2>

        {Array.isArray(parents) && parents.length > 0 && (
          <div className="w-full space-y-6">
            {parents.map((parent) => (
              <div key={parent._id} className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Parent Details</h3>
                <hr className="mb-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <p className="text-gray-700 font-semibold">
                    Role: <span className="font-normal">{parent.role}</span>
                  </p>
                  <p className="text-gray-700">
                    Full Name: <span className="font-normal">{parent.fullName}</span>
                  </p>
                  <p className="text-gray-700">
                    Email: <span className="font-normal">{parent.email}</span>
                  </p>
                  <p className="text-gray-700">
                    Mobile: <span className="font-normal">{parent.mobileNumber}</span>
                  </p>
                  <p className="text-gray-700">
                    Occupation: <span className="font-normal">{parent.occupation}</span>
                  </p>
                </div>

                <div className="flex flex-row justify-center sm:justify-end gap-4 mt-6">
  <Button
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-auto min-w-max"
    onClick={() => handleEdit(parent)}
  >
    Edit Parent
  </Button>
  <Button
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-auto min-w-max"
    onClick={() => handleDelete(parent._id)}
  >
    Delete Parent
  </Button>
</div>

              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center sm:justify-start">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
            onClick={handleAdd}
          >
            Add Parent
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default UserParent;
