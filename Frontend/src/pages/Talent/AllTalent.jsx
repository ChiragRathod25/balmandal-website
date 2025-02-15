import { useCallback, useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import useCustomReactQuery from "../../utils/useCustomReactQuery";
import { QueryHandler } from "../../components";

function AllTalent() {
  const [talents, setTalents] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData?.firstName);

  // Fetch talents data
  const fetchTalents = useCallback(() => databaseService.getUserTalents(), []);
  const { data, error, loading } = useCustomReactQuery(fetchTalents);

  useEffect(() => {
    if (data) {
      setTalents(data);
    }
  }, [data]);

  // Handle delete action
  const handleDelete = async (talentId) => {
    if (!window.confirm("Are you sure you want to delete this talent?")) return;

    try {
      await databaseService.deleteTalent({ talentId });
      setTalents((prev) => prev.filter((talent) => talent._id !== talentId));
      console.log("Talent Deleted");
    } catch (error) {
      console.error("Error deleting talent:", error);
    }
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        {Array.isArray(talents) && talents.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">{`${user}'s Talents`}</h2>
            <div className="w-full">
              {talents.map((talent) => (
                <div
                  key={talent._id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4 lg:flex-row flex-col text-center lg:text-left"
                >
                  <div className="flex items-center gap-4 flex-col lg:flex-row">
                    {talent.images?.length > 0 && (
                      <img
                        src={talent.images[0]}
                        alt={talent.heading}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <p className="font-semibold text-lg">{talent.heading}</p>
                  </div>
                  <div className="flex gap-2 mt-4 lg:mt-0">
                    <Button
                      onClick={() => navigate(`/talent/${talent._id}`)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => navigate(`/talent/edit/${talent._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(talent._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate("/talent/add")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add Talent
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default AllTalent;
