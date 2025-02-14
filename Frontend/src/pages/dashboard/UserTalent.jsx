import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TalentForm, QueryHandler, Button } from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import { useSelector, useDispatch } from 'react-redux';
import { setEditableUserTalent } from '../../slices/dashboard/dashboardSlice';
import databaseService from '../../services/database.services';

function UserTalent() {
  const { userId } = useParams();
  const userName=useSelector((state)=>state.dashboard.editableUser?.firstName)
  const fetchUserTalents = useCallback(() => databaseService.getUserTalents(userId), [userId]);
  const { data, error, loading, refetch } = useCustomReactQuery(fetchUserTalents);
  const dispatch = useDispatch();
  const [talents, setTalents] = useState(null);
  const [add, setAdd] = useState(false);
  const editableTalent = useSelector((state) => state.dashboard.editableUserTalent);
  console.log('Editable Talent', editableTalent);

  useEffect(() => {
    console.log(userId);
    console.log('Refetching');
    refetch();
  }, [userId, editableTalent, add]);

  useEffect(() => {
    console.log('Data updation:', data);
    if (data) {
      setTalents(data);
    }
  }, [data]);
  if (add) {
    console.log('Add', add);
    return (
      <div className="container mx-auto p-4">
        <TalentForm setAdd={setAdd} />
      </div>
    );
  }

  if (editableTalent) {
    console.log('Editable Talent', editableTalent);
    return (
      <div className="container mx-auto p-4">
        <TalentForm talent={editableTalent} setAdd={setAdd} />
      </div>
    );
  }

  const handleDelete = async (talentId) => {
    if (!window.confirm('Are you sure want to delete talent?')) {
      return;
    }
    try {
      await databaseService.deleteTalent({talentId},userId);
      setTalents((prev) => prev.filter((talent) => talent._id !== talentId));
      console.log('Talent Deleted');
    } catch (error) {
      console.error('Error deleting talent:', error);
    }
  };
  const handleEdit = (talent) => {
    dispatch(setEditableUserTalent(talent));
  };
  const handleAdd = () => {
    dispatch(setEditableUserTalent(null));
    setAdd(true);
  };
  return (
    <>
      <QueryHandler queries={[{ loading, error }]}>
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">{`${userName}'s Talents`}</h2>
          
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
                    <Button onClick={() => handleEdit(talent)}>Edit</Button>
                    <Button onClick={() => handleDelete(talent._id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button onClick={handleAdd}>Add Talent</Button>
        </div>
      </QueryHandler>
    </>
  );
}

export default UserTalent;
