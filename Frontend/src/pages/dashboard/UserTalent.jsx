import React, { useCallback, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { TalentForm, QueryHandler, Button } from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import { useSelector, useDispatch } from 'react-redux';
import { setEditableUserTalent } from '../../slices/dashboard/dashboardSlice';
import databaseService from '../../services/database.services';

function UserTalent() {
  const { userId } = useParams();
  const userName = useSelector((state) => state.dashboard.editableUser?.firstName);
  const fetchUserTalents = useCallback(() => databaseService.getUserTalents(userId), [userId]);
  const { data, error, loading, refetch } = useCustomReactQuery(fetchUserTalents);
  const dispatch = useDispatch();
  const [talents, setTalents] = useState(null);
  const [add, setAdd] = useState(false);
  const editableTalent = useSelector((state) => state.dashboard.editableUserTalent);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [userId, editableTalent, add]);

  useEffect(() => {
    if (data) {
      setTalents(data);
    }
  }, [data]);

  if (add) {
    return (
      <div className="container mx-auto p-6">
        <TalentForm setAdd={setAdd} />
      </div>
    );
  }

  if (editableTalent) {
    return (
      <div className="container mx-auto p-6">
        <TalentForm talent={editableTalent} setAdd={setAdd} />
      </div>
    );
  }

  const handleDelete = async (talentId) => {
    if (!window.confirm('Are you sure you want to delete this talent?')) {
      return;
    }
    try {
      await databaseService.deleteTalent({ talentId }, userId);
      setTalents((prev) => prev.filter((talent) => talent._id !== talentId));
    } catch (error) {
      console.error('Error deleting talent:', error);
    }
  };

  const handleEdit = (talent) => {
    dispatch(setEditableUserTalent(talent));
  };

  const handleAdd = () => {
    dispatch(setEditableUserTalent(null));
    setAdd(true);
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto">
        {Array.isArray(talents) && talents.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-center text-[#C30E59] mb-6">{`${userName}'s Talents`}</h2>
            <div className="w-full space-y-4">
              {talents.map((talent) => (
                <div
                  key={talent?._id}
                  className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition-all"
                >
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {talent?.images?.length > 0 && (
                      <img
                        src={talent?.images[0]}
                        alt={talent?.heading}
                        className="w-14 h-14 object-cover rounded-md border border-gray-300"
                      />
                    )}
                    <p className="font-semibold text-lg text-center sm:text-left">{talent?.heading}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-center sm:justify-end">
                  <Button
                                            onClick={() => navigate(`/talent/${talent._id}`)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            View
                                        </Button>  
                    <Button
                      onClick={() => handleEdit(talent)}
                      className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(talent?._id)}
                      className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="w-full flex justify-center mt-6">
          <Button
            onClick={handleAdd}
            className="bg-[#C30E59] text-white hover:bg-[#E82561] px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Add Talent
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default UserTalent;
