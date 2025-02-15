import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";
import useCustomReactQuery from "../../utils/useCustomReactQuery";
import { QueryHandler } from "../../components";

function Talent() {
  const { talentId } = useParams();
  const [talent, setTalent] = useState(null);
  const navigate = useNavigate();

  const fetchTalent = useCallback(
    () => databaseService.getTalentById({ talentId }),
    [talentId]
  );
  const { data, loading, error } = useCustomReactQuery(fetchTalent);

  useEffect(() => {
    if (!talentId) {
      navigate("/");
      return;
    }
    if (data) {
      setTalent(data);
    }
  }, [data, talentId, navigate]);

  const handleDelete = async (talentId) => {
    if (!window.confirm("Are you sure you want to delete this talent?")) return;

    try {
      await databaseService.deleteTalent({ talentId });
      navigate("/talent");
      console.log("Talent Deleted");
    } catch (error) {
      console.log("Error Deleting Talent", error);
    }
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {talent && (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{talent.heading}</h2>
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <p className="text-gray-700 mb-4">{talent.description}</p>

            {/* Image Section */}
            {Array.isArray(talent.images) && talent.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {talent.images.map((img, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={img}
                      alt={talent.heading}
                      className="max-w-full h-auto rounded-lg shadow-md"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                onClick={() => navigate(`/talent/edit/${talent._id}`)}
              >
                Edit Talent
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                onClick={() => handleDelete(talent._id)}
              >
                Delete Talent
              </Button>
              <Button
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                onClick={() => navigate("/talent")}
              >
                Manage Talents
              </Button>
            </div>
          </div>
        </div>
      )}
    </QueryHandler>
  );
}

export default Talent;
