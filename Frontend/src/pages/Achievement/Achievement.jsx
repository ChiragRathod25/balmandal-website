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
      databaseService
        .getAchievementById({ achievementId })
        .then((achievement) => setAchievement(achievement));
    else navigate("/");
    console.log("EditPost", achievement);
  }, [achievementId, navigate]);
  return achievement ? (
    <>
      <div key={achievement._id}>
        <h3>{achievement.title}</h3>
        <hr />
        <div>
          <p>{achievement.description}</p>
        </div>
        {achievement.images.map((img, index) => (
          <div key={index} className={`flex`}>
            <img src={img} alt={achievement.title} />
          </div>
        ))}
        <Button
          onClick={() => navigate(`/achievement/edit/${achievement._id}`)}
        >
          Edit Achievement
        </Button>
      </div>
    </>
  ) : null;
}

export default Achievement;
