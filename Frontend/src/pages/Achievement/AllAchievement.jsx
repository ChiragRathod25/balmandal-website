import { useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

function AllAchievement() {
  const [achievements, setAchievements] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    databaseService
      .getUserAchivements()
      .then((response) => setAchievements(response.data))
      .catch((error) => {
        console.error("Error fetching achievements:", error);
  
      });
    console.log(achievements);
  }, []);

  const handleDelete = async (achievementId) => {
    const response = databaseService
      .deleteAchivement({ achievementId })
      .then((response) => response.data);
    if (response) {
      setAchievements((prevAchievements)=>prevAchievements.filter((achievement)=>achievement._id!=achievementId))
      console.log("Achievement Deleted");
    }
  };

  const user = useSelector((state) => state.auth.userData?.firstName);

  return achievements ? (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{`${user}'s Achievements`}</h2>

      {Array.isArray(achievements) &&
        achievements.length > 0 &&
        achievements.map((achievement) => (
          <div key={achievement._id} className="mb-6 p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{achievement.title}</h3>
            <hr className="my-2" />
            <div>
              <p className="mb-2">{achievement.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {achievement.images.map((img, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-1">
                  <img src={img} alt={achievement.title} className="w-full h-auto rounded" />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => navigate(`/achievement/edit/${achievement._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit Achievement
              </Button>
              <Button
                onClick={() => handleDelete(achievement?._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete Achievement
              </Button>
            </div>
          </div>
        ))}

      <Button
        onClick={() => navigate("/achievement/add")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Achievement
      </Button>
    </div>
  ) : (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Loading...</h2>
    </div>
  );
}

export default AllAchievement;
