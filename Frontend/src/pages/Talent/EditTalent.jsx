import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import { TalentForm } from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';

function EditTalent() {
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
  }, [data,talentId]);
  return (
    <QueryHandler queries={[{ loading, error }]}>
      {talent ? (

       
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Edit Talent
              </h2>
            <TalentForm talent={talent} />
          </div>
       
      ) : null}
    </QueryHandler>
  );
}

export default EditTalent;
