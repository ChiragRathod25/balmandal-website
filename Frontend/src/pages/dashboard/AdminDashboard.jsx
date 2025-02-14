import React, { useCallback, useEffect,useState } from 'react';
import databaseService from '../../services/database.services';
import customReactQuery from '../../utils/useCustomReactQuery';
import { UserCard } from '../../components';
function AdminDashboard() {
  const fetchAllUsers = useCallback(() => databaseService.fetchAllUsers(), []);
  const { data, loading, error, refetch } = customReactQuery(fetchAllUsers);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="users flex flex-wrap gap-8">
          {users && users.map((user) => <UserCard key={user._id} user={user} />)}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
