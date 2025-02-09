import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";

function Achievement() {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (achievementId) {
      databaseService
        .getAchievementById({ achievementId })
        .then((achievement) => setAchievement(achievement.data));
    } else navigate("/");
    console.log("Achievement", achievement);
  }, [achievementId, navigate]);

  const handleDelete = async (achievementId) => {
    const response = databaseService
      .deleteAchivement({ achievementId })
      .then((response) => response.data);
    if (response) {
      navigate('/achievement')
      console.log("Achievement Deleted");
    }
  };

  return achievement ? (
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
                <img src={img} alt={achievement.title} className="max-w-full h-auto rounded-lg" />
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
        </div>
      </div>
    </div>
  ) : (
    <h2 className="text-center text-2xl">Loading...</h2>
  );
}

export default Achievement;
