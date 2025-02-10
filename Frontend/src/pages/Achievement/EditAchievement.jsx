import React, { use, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import { AchievementForm, Container } from '../../components';
import  useCustomeReactQuery  from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';

function EditAchievement() {
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
    console.log('Edit Achievement', achievement);
  }, [achievementId, data,navigate]);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {achievement ? (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <Container>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Edit Achievement</h2>
              <AchievementForm achievement={achievement} />
            </div>
          </Container>
        </div>
      ) : null
      }
    </QueryHandler>
  );
}

export default EditAchievement;
