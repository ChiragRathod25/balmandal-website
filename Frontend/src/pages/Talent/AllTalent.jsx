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
    const response = await databaseService
      .deleteTalent({ talentId })
      .then((response) => response.data);
    if (response) {
        setTalents((prevTalents)=>prevTalents.filter((talent)=>talent._id!==talentId))
      console.log("Talent Deleted");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{`${user}'s Talents`}</h2>
      {Array.isArray(talents) && talents.length > 0 ? (
        talents.map((talent) => (
          <div key={talent._id} className="mb-8 p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{talent.heading}</h3>
            <hr className="mb-2" />
            <div className="mb-4">
              <p>{talent.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {talent.images.map((img, index) => (
                <div key={index} className="flex justify-center">
                  <img src={img} alt={talent.title} className="max-w-full h-auto rounded-lg" />
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button onClick={() => navigate(`/talent/edit/${talent._id}`)}>
                Edit Talent
              </Button>
              <Button onClick={() => handleDelete(talent?._id)}>
                Delete Achievement
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No talents found.</p>
      )}
      <Button onClick={() => navigate("/talent/add")}>Add Talent</Button>
    </div>
  );
}

export default AllTalent;
