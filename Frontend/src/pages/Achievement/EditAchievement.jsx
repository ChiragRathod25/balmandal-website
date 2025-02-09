import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { AchievementForm, Container } from "../../components";

function EditAchievement() {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (achievementId)
      databaseService
        .getAchievementById({achievementId})
        .then((achievement) => setAchievement(achievement.data));
        else 
            navigate('/')
    console.log("Edit Achievement",achievement);
    
  },[achievementId,navigate]);

  return achievement ?(
    <div className="w-full">
        <Container>
            <AchievementForm achievement={achievement}/>
        </Container>
    </div>
  ):null
}

export default EditAchievement;
