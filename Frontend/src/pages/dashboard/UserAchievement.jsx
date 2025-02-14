import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      <div className="container mx-auto p-4">
        {Array.isArray(achievements) && achievements.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">{`${userName}'s Achievements`}</h2>
            <div className="w-full">
              {achievements.map((achievement) => (
                <div
                  key={achievement?._id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <div className="flex items-center gap-4">
                    {achievement?.images?.length > 0 && (
                      <img
                        src={achievement?.images[0]}
                        alt={achievement?.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <p className="font-semibold">{achievement?.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(achievement)}>Edit</Button>
                    <Button onClick={() => handleDelete(achievement?._id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="w-full flex justify-center">
          <Button onClick={handleAdd} className="bottom-4 right-4">
            Add Achievement
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default UserAchievement;
