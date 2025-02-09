import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { TalentForm } from "../../components";

function EditTalent() {
  const { talentId } = useParams();
  const [talent, setTalent] = useState(null);
  useEffect(() => {
    if (talentId)
      databaseService
        .getTalentById({ talentId })
        .then((response) => setTalent(response.data));
  }, [talentId]);
  return talent ? (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <TalentForm talent={talent} />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-semibold">Loading...</h2>
    </div>
  );
}

export default EditTalent;
