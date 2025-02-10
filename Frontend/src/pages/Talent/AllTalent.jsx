import { useCallback, useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import useCustomReactQuery from "../../utils/useCustomReactQuery";
import { QueryHandler } from "../../components";

function AllTalent() {
  const [talents, setTalents] = useState([]);
  const navigate = useNavigate();

  const fetchTalents = useCallback(() => databaseService.getUserTalents(), []);
  const { data, error, loading } = useCustomReactQuery(fetchTalents);

  useEffect(() => {
    if (data) {
      setTalents(data);
    }
  }, [data]);

  const handleDelete = async (talentId) => {
    if (!window.confirm("Are you sure want to delete this talent?")) {
      return;
    }
    try {
      await databaseService.deleteTalent({ talentId });
      setTalents((prev) => prev.filter((talent) => talent._id !== talentId));
      console.log("Talent Deleted");
    } catch (error) {
      console.error("Error deleting talent:", error);
    }
  };

  const user = useSelector((state) => state.auth.userData?.firstName);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{`${user}'s Talents`}</h2>

        {Array.isArray(talents) && talents.length > 0 && (
          <div className="w-full">
            {talents.map((talent) => (
              <div
                key={talent._id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <div className="flex items-center gap-4">
                  {talent.images?.length > 0 && (
                    <img
                      src={talent.images[0]}
                      alt={talent.heading}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <p className="font-semibold">{talent.heading}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate(`/talent/${talent._id}`)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => navigate(`/talent/edit/${talent._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(talent._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => navigate("/talent/add")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Talent
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default AllTalent;
