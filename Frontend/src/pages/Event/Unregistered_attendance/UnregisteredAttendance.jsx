// this will display One unregistered attendance info
import React, { useCallback } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import databaseService from '../../../services/database.services';
import useCustomReactQuery from '../../../utils/useCustomReactQuery';
import { Button } from '../../../components';


function UnregisteredAttendance() {
  const { unregisteredAttendanceId } = useParams();
  console.log('unregisteredAttendanceId', unregisteredAttendanceId);
 
  const fetchUnregisteredAttendance = useCallback(
    () => databaseService.getUnregisteredAttendanceById({unregisteredAttendanceId}),
    [unregisteredAttendanceId]
  );
  const {
    data: UnregisteredAttendance,
    loading,
    error,
  } = useCustomReactQuery(fetchUnregisteredAttendance);
  const navigate=useNavigate()
  const {eventId}=useParams()

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
    <div>
      <h1>Unregistered Attendance</h1>
      <div>
        <p>Full Name: {UnregisteredAttendance.fullName}</p>
        <p>Mobile: {UnregisteredAttendance.mobile}</p>
        <p>Email: {UnregisteredAttendance.email}</p>
        <p>Remark: {UnregisteredAttendance.remark}</p>
        <p>Status: {UnregisteredAttendance.status}</p>
      </div>
      
      <Button onClick={() => navigate(`/event/attendance/unregistered/edit/${unregisteredAttendanceId}`)}>Edit</Button>
      <Button onClick={() => navigate(`/event/${UnregisteredAttendance.eventId}`)}>Back</Button>
    </div>
  );
}

export default UnregisteredAttendance;
