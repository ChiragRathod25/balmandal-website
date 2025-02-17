import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import { Button } from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';
import { useSelector } from 'react-redux';
import {FilesDisplayHelper} from '../../components';

function Talent() {
  const { talentId } = useParams();
  const [talent, setTalent] = useState(null);
  const navigate = useNavigate();

  const isAdmin=useSelector((state)=>state.auth.userData.isAdmin);
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
  }, [data, talentId, navigate]);

  const handleDelete = async (talentId) => {
    if (!window.confirm('Are you sure you want to delete this talent?')) return;

    try {
      await databaseService.deleteTalent({ talentId });
      navigate('/talent');
      console.log('Talent Deleted');
    } catch (error) {
      console.log('Error Deleting Talent', error);
    }
  };
  console.log('talent images', talent?.images);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {talent && (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{talent.heading}</h2>
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <p className="text-gray-700 mb-4">{talent.description}</p>

            {/* Image Section */}
            {/* {Array.isArray(talent.images) && talent.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {talent.images && talent?.images.length>0  && talent.images.map((img, index) =>
                  img.includes('image') ? (
                    <div key={index} className="flex justify-center">
                      <img
                        src={img}
                        alt={talent.heading}
                        className="max-w-full h-auto rounded-lg shadow-md"
                        onError={(e) => (e.target.src = '/fallback-image.jpg')}
                      />
                    </div>
                  ) : (
                    <div key={index} className="flex justify-center">
                      <video
                        src={img}
                        controls
                        className="max-w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  )
                )}
              </div>
            )} */}
            <FilesDisplayHelper cloudFiles={talent?.images} />
        
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-start">
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
              {

                !isAdmin && <Button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => navigate('/talent')}
                >
                  Manage Talents
                </Button>
              }
 
            </div>
          </div>
        </div>
      )}
    </QueryHandler>
  );
}

export default Talent;
