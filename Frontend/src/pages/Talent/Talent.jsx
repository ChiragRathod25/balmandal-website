import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";

function Talent() {
  const { talentId } = useParams();
  const [talent, setTalent] = useState(null);
  const [isTalentUpdated, setIsTalentUpdated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (talentId) {
      databaseService
        .getTalentById({ talentId })
        .then((response) => setTalent(response.data));
      console.log(talent);
    } else navigate("/talent");
  }, [talentId, navigate]);
  useEffect(() => {
    console.log(talent);
  }, [talent]);

  const handleDelete = async (talentId) => {
    const response = databaseService
      .deleteAchivement({ talentId })
      .then((response) => response.data);
    if (response) {
      setIsTalentUpdated(false);
      console.log("Talent Deleted");
    }
  };

  return talent ? (
    <>
      <div key={talent._id}>
        <h3>{talent.heading}</h3>
        <hr />
        <div>
          <p>{talent.description}</p>
        </div>

        {Array.isArray(talent?.images) &&
          talent.images.length > 0 &&
          talent.images.map((img, index) => (
            <div key={index} className="flex">
              <img
                src={img}
                alt={talent.heading}
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
            </div>
          ))}

        <Button onClick={() => navigate(`/talent/edit/${talent._id}`)}>
          Edit Talent
        </Button>
        <Button onClick={() => handleDelete(talent?._id)}>
          Delete Achievement
        </Button>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Talent;
