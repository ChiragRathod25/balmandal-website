import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";


function Talent() {
    const { talentId } = useParams();
  const [talent, setTalent] = useState(null);
  useEffect(() => {
    if (talentId)
      databaseService
        .getTalentById({ talentId })
        .then((response) => setTalent(response.data));
  }, [talentId]);
  const navigate=useNavigate()
  
  return talent?(
    <>
     <div key={talent._id}>
          <h3>{talent.heading}</h3>
          <hr />
          <div>
            <p>{talent.description}</p>
          </div>
          {talent.images.map((img, index) => (
            <div key={index} className={`flex`}>
              <img src={img} alt={talent.title} />
            </div>
          ))}
               <Button
            onClick={() => navigate(`/talent/edit/${talent._id}`)}
          >
            Edit Talent
          </Button>
        </div>
    </>
  ):null
}

export default Talent