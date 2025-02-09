import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";

function Achievement() {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (achievementId)
    {
        databaseService
      .getAchievementById({ achievementId })
      .then((achievement) => setAchievement(achievement.data));
    }
    else navigate("/");
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
    <>
      <div key={achievement._id}>
        <h3>{achievement.title}</h3>
        <hr />
        <div>
          <p>{achievement.description}</p>
        </div>
        {
          achievement?.images && achievement.images.length>0 &&
        achievement.images.map((img, index) => (
          <div key={index} className={`flex`}>
            <img src={img} alt={achievement.title} />
          </div>
        ))}
        <Button
          onClick={() => navigate(`/achievement/edit/${achievement._id}`)}
        >
          Edit Achievement
        </Button>
        <Button onClick={() => handleDelete(achievement?._id)}>
              Delete Achievement
          </Button>
      </div>
    </>
  ) : (
    <h2>Loading...</h2>
  );
}

export default Achievement;
