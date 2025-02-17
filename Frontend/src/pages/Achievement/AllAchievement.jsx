import { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import { useSelector } from 'react-redux';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';

function AllAchievement() {
  const [achievements, setAchievements] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData?.firstName);

  // Fetch achievements data
  const fetchAchievements = useCallback(() => databaseService.getUserAchivements(), []);
  const { data, error, loading } = useCustomReactQuery(fetchAchievements);
  useEffect(() => {
    if (data) {
      setAchievements(data);
    }
  }, [data]);

  // Handle delete action
  const handleDelete = async (achievementId) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) {
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

  const getHeroImage = (achievement) => {
    let hero =
      'https://plus.unsplash.com/premium_photo-1683749809341-23a70a91b195?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWNoaWV2ZW1lbnR8ZW58MHx8MHx8fDA%3D';
    const files = achievement?.images;
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.includes('image')) {
          hero = file;
          return hero;
        }
      }
    }
    return hero;
  };
  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        {Array.isArray(achievements) && achievements.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">{`${user}'s Achievements`}</h2>
            <div className="w-full">
              {achievements.map((achievement) => (
                <div
                  key={achievement._id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4 lg:flex-row flex-col text-center lg:text-left"
                >
                  <div className="flex items-center gap-4 flex-col lg:flex-row">
                    <img
                      src={getHeroImage(achievement)}
                      alt={achievement.title || 'hero'}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <p className="font-semibold text-lg">{achievement.title}</p>
                  </div>
                  <div className="flex gap-2 mt-4 lg:mt-0">
                    <Button
                      onClick={() => navigate(`/achievement/${achievement._id}`)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => navigate(`/achievement/edit/${achievement._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(achievement._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/achievement/add')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add Achievement
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default AllAchievement;
