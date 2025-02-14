import React, { useCallback, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { AchievementForm, QueryHandler, Button } from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import { useSelector, useDispatch } from 'react-redux';
import { setEditableUserAchievement } from '../../slices/dashboard/dashboardSlice';
import databaseService from '../../services/database.services';

function UserAchievement() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [achievements, setAchievements] = useState(null);
  const [add, setAdd] = useState(false);
  const navigate=useNavigate();

  const userName = useSelector((state) => state.dashboard?.editableUser?.firstName);
  const editableAchievement = useSelector((state) => state.dashboard.editableUserAchievement);

  const fetchUserAchievements = useCallback(
    () => databaseService.getUserAchivements(userId),
    [userId]
  );
  const { data, error, loading, refetch } = useCustomReactQuery(fetchUserAchievements);

  useEffect(() => {
    refetch();
  }, [userId, editableAchievement, add]);

  useEffect(() => {
    if (data) {
      setAchievements(data);
    }
  }, [data]);

  const handleDelete = async (achievementId) => {
    if (!window.confirm('Are you sure want to delete achievement?')) {
      return;
    }
    try {
      await databaseService.deleteAchivement({ achievementId }, userId);
      setAchievements((prev) => prev.filter((ach) => ach._id !== achievementId));
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  const handleEdit = (achievement) => {
    dispatch(setEditableUserAchievement(achievement));
  };

  const handleAdd = () => {
    dispatch(setEditableUserAchievement(null));
    setAdd(true);
  };

  

  if (add) {
    return (
      <div className="container mx-auto p-4">
        <AchievementForm setAdd={setAdd} />
      </div>
    );
  }

  if (editableAchievement) {
    return (
      <div className="container mx-auto p-4">
        <AchievementForm achievement={editableAchievement} />
      </div>
    );
  }

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto ">
        {Array.isArray(achievements) && achievements.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-center text-[#C30E59] mb-6">{`${userName}'s Achievements`}</h2>
            <div className="w-full space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement?._id}
                  className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition-all"
                >
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {achievement?.images?.length > 0 && (
                      <img
                        src={achievement?.images[0]}
                        alt={achievement?.title}
                        className="w-14 h-14 object-cover rounded-md border border-gray-300"
                      />
                    )}
                    <p className="font-semibold text-lg text-center sm:text-left">
                      {achievement?.title}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-center sm:justify-end">
                  <Button
                                            onClick={() => navigate(`/achievement/${achievement._id}`)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            View
                                        </Button>
                    <Button
                      onClick={() => handleEdit(achievement)}
                      className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(achievement?._id)}
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
            className="bg-[#10B981] text-white hover:bg-[#059669] px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Add Achievement
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default UserAchievement;
