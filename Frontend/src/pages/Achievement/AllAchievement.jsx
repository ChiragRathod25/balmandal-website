import { useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

function AllAchievement() {
  const [achievements, setAchievements] = useState(null);
  const navigate = useNavigate();
  const [isAchievementUpdated, setIsAchievementUpdated] = useState(null);

  useEffect(() => {
    databaseService
      .getUserAchivements()
      .then((response) => setAchievements(response.data))
      .catch((error) => {
        console.error("Error fetching achievements:", error);
        setIsAchievementUpdated(true);
      });
    console.log(achievements);
  }, [isAchievementUpdated]);

  const handleDelete = async (achievementId) => {
    const response = databaseService
      .deleteAchivement({ achievementId })
      .then((response) => response.data);
    if (response) {
      setIsAchievementUpdated(false);
      console.log("Achievement Deleted");
    }
  };

  const user = useSelector((state) => state.auth.userData?.firstName);

  return achievements ? (
    <>
      <h2>{`${user}'s Achievements`}</h2>

      {Array.isArray(achievements) &&
        achievements.length > 0 &&
        achievements.map((achievement) => (
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
            <Button onClick={() => handleDelete(achievement?._id)}>
              Delete Achievement
            </Button>
          </div>
        ))}
        
      <Button onClick={() => navigate("/achievement/add")}>
        Add Achievement
      </Button>
    </>
  ) : (
    <>
      <h2>Loading...</h2>
    </>
  );
}

export default AllAchievement;
