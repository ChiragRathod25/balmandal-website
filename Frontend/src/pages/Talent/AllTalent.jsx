import { useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

function AllTalent() {
  const [talents, setTalents] = useState([]);


  useEffect(() => {

    databaseService
      .getUserTalents()
      .then((response) => setTalents(response.data));

  }, []);
  const user = useSelector((state) => state.auth.userData.firstName);

  const navigate = useNavigate();

  const handleDelete = async (talentId) => {
 
    const response = databaseService
      .deleteTalent({ talentId })
      .then((response) => response.data)
    if (response) {
     navigate('/talent')
      console.log("Talent Deleted");
    }
  };
  return (
    <>
      <h2>{`${user}'s Talents`}</h2>
      <></>
      {Array.isArray(talents) &&
        talents.length > 0 &&
        talents.map((talent) => (
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
            <Button onClick={() => navigate(`/talent/edit/${talent._id}`)}>
              Edit Talent
            </Button>
            <Button onClick={() => handleDelete(talent?._id)}>
              Delete Achievement
            </Button>
          </div>
        ))}
      <Button onClick={() => navigate("/talent/add")}>Add Talent</Button>
    </>
  );
}

export default AllTalent;
