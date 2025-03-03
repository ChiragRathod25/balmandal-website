import React, { useCallback } from 'react';
import { UserAttendanceCard } from '..';
import { useSelector } from 'react-redux';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';

function UserAttendance() {
  const userId = useSelector((state) => state.auth.userData._id);
  const fetchUserAttendance = useCallback(
    () => databaseService.getAttendanceByUserId({ userId }),
    [userId]
  );
  const { data: userAttendance, loading, error } = useCustomReactQuery(fetchUserAttendance);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center text-lg font-semibold">{error}</div>;
  }

  return (
    <>
      <div>UserAttendance</div>
      {userAttendance && userAttendance.length === 0 && <div>No Attendance</div>}

      {userAttendance &&
        userAttendance.length > 0 &&
        Array.isArray(userAttendance) &&
        userAttendance.map((attendance) => {
          return <UserAttendanceCard key={attendance._id} attendance={attendance} />;
        })}
    </>
  );
}

export default UserAttendance;
