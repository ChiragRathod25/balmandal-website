import React from "react";
import { AchievementForm, Container } from "../../components";

function AddAchievement() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <AchievementForm />
        </div>
      </Container>
    </div>
  );
}

export default AddAchievement;
