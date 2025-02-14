import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import { Button } from '../../components';
import { QueryHandler } from '../../components';
import useCustomeReactQuery from '../../utils/useCustomReactQuery';

function Achievement() {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const navigate = useNavigate();

  const fetchAchievement = useCallback(
    () => databaseService.getAchievementById({ achievementId }),
    [achievementId]
  );
  const { data, loading, error } = useCustomeReactQuery(fetchAchievement);

  useEffect(() => {
    if (!achievementId) {
      navigate('/');
      return;
    }
    if (data) {
      setAchievement(data);
    }
    console.log('Achievement', achievement);
  }, [data, achievementId, navigate]);

  const handleDelete = async (achievementId) => {
    if (!confirm('Are you sure want to delete Achievement?')) {
      return;
    }
    try {
      const response = await databaseService
        .deleteAchivement({ achievementId })
        .then((response) => response.data);
      if (response) {
        navigate('/achievement');
        console.log('Achievement Deleted');
      }
    } catch (error) {
      console.log('Error Deleting Achievement', error);
    }
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {achievement ? (
        <div className="container mx-auto p-4">
          <div key={achievement._id} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">{achievement.title}</h3>
            <hr className="mb-4" />
            <div className="mb-4">
              <p className="text-gray-700">{achievement.description}</p>
            </div>
            {achievement?.images && achievement.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {achievement.images.map((img, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={img}
                      alt={achievement.title}
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex space-x-4">
              <Button
                onClick={() => navigate(`/achievement/edit/${achievement._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Edit Achievement
              </Button>
              <Button
                onClick={() => handleDelete(achievement?._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Achievement
              </Button>
              <Button
                onClick={() => navigate('/achievement')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Manage Achievements
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </QueryHandler>
  );
}

export default Achievement;
