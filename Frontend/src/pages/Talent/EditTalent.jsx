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
  return (
    <div>
      <TalentForm talent={talent} />
    </div>
  );
}

export default EditTalent;
