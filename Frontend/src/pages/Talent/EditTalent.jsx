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
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <TalentForm talent={talent} />
          </div>
        </div>
      ) : null}
    </QueryHandler>
  );
}

export default EditTalent;
