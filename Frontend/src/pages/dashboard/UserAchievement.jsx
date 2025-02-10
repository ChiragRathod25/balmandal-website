import React, { useCallback, useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { AchievementForm, QueryHandler,Button } from '../../components';
import { useCustomReactQuery } from '../../utils/useCustomReactQuery';
import { useSelector,useDispatch } from 'react-redux';
import { setEditableUserAchievement } from '../../slices/dashboard/dashboardSlice';
import databaseService from '../../services/database.services';

function UserAchievement() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [achievements, setAchievements] = useState(null);
  const editableAchievement = useSelector((state) => state.dashboard.editableAchievement);
  const fetchUserAchievements = useCallback(() => databaseService.getUserAchivements(userId),[userId]);
    const { data, error, loading } = useCustomReactQuery(fetchUserAchievements);

  useEffect(() => {
    console.log(userId);
    if(data){
      setAchievements(data);
    }
  }, [data,userId, editableAchievement]);

  const handleDelete = async (achievementId) => {
    if (!window.confirm('Are you sure want to delete achievement?')) {
        return;
    }
    try {
        await databaseService.deleteAchivement({ achievementId });
        setAchievements((prev) => prev.filter((ach) => ach._id !== achievementId));
        console.log('Achievement Deleted');
    } catch (error) {
        console.error('Error deleting achievement:', error);
    }
    };



  if(editableAchievement){
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
                <h2 className="text-2xl font-bold mb-4">{`${achievements[0].user.firstName}'s Achievements`}</h2>
                <div className="w-full">
                {achievements.map((achievement) => (
                    <div
                    key={achievement._id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4"
                    >
                    <div className="flex items-center gap-4">
                        {achievement.images?.length > 0 && (
                        <img
                            src={achievement.images[0]}
                            alt={achievement.title}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        )}
                        <p className="font-semibold">{achievement.title}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                        onClick={() => 
                           dispatch(setEditableUserAchievement(achievement))
                        }
                        >
                        Edit
                        </Button>
                        <Button
                        onClick={() => handleDelete(achievement._id)}
                        >
                        Delete
                        </Button>
                    </div>
                    </div>
                ))}
                </div>
            </>
            )}
        </div>
    </QueryHandler>
  )
}

export default UserAchievement;
