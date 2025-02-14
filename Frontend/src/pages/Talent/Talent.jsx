import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import { Button } from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';

function Talent() {
  const { talentId } = useParams();
  const [talent, setTalent] = useState(null);
  const navigate = useNavigate();

  const fetchTalent = useCallback(() => databaseService.getTalentById({ talentId }), [talentId]);
  const { data, loading, error } = useCustomReactQuery(fetchTalent);

  useEffect(() => {
    if (!talentId) {
      navigate('/');
      return;
    }
    if (data) {
      setTalent(data);
    }
    console.log('Edit Talent', talent);
  }, [data, talentId, navigate]);
  useEffect(() => {
    console.log(talent);
  }, [talent, talentId, data, navigate]);

  const handleDelete = async (talentId) => {
    if (!confirm(`Delete talent ?`)) {
      return;
    }
    try {
      const response = await databaseService
        .deleteTalent({talentId})
        .then((response) => response.data);
      if (response) {
        navigate('/talent');
        console.log('Talent Deleted');
      }
    } catch (error) {
      console.log('Error Deleting Talent', error);
    }
  };
  return (
    <QueryHandler queries={[{ loading, error }]}>
      {talent ? (
        <>
          <div key={talent._id} className="p-4 md:p-8 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{talent.heading}</h3>
            <hr className="mb-4" />
            <div className="mb-4">
              <p className="text-gray-700">{talent.description}</p>
            </div>

            {Array.isArray(talent?.images) &&
              talent.images.length > 0 &&
              talent.images.map((img, index) => (
                <div key={index} className="flex justify-center mb-4">
                  <img
                    src={img}
                    alt={talent.heading}
                    className="max-w-full h-auto rounded-lg"
                    onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  />
                </div>
              ))}

            <div className="flex space-x-4">
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate(`/talent/edit/${talent._id}`)}
              >
                Edit Talent
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleDelete(talent?._id)}
              >
                Delete Talent
              </Button>
              <Button 
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate('/talent')}
              >
                Manage Talents
              </Button>
            </div>
          </div>
        </>
      ) : null}

    </QueryHandler>
  );
}

export default Talent;
