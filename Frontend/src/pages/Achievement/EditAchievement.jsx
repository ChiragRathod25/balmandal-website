import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { AchievementForm, Container } from "../../components";

function EditAchievement() {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (achievementId)
      databaseService
        .getAchievementById({ achievementId })
        .then((achievement) => setAchievement(achievement.data));
    else 
      navigate('/');
    console.log("Edit Achievement", achievement);
  }, [achievementId, navigate]);

  return achievement ? (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Container>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Edit Achievement</h2>
          <AchievementForm achievement={achievement} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditAchievement;
