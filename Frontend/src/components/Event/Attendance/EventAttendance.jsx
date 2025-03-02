// this will display all the registered attendies of one event list view,
// if click on that redirect to the user profile page where we can see the details of that user and we can also delete and edit that user

import React,{useCallback} from 'react'
import { Button } from "../../index"
import { useNavigate, useParams } from 'react-router-dom'
import databaseService from '../../../services/database.services';
import useCustomReactQuery from '../../../utils/useCustomReactQuery';



function EventAttendance() {
  
    const { eventId } = useParams();
    const fetchAttendance = useCallback(
      () => databaseService.getAttendanceByEventId({ eventId }),
      [eventId]
    );
    const navigate = useNavigate();
    const { loading, error, data: attendanceList } = useCustomReactQuery(fetchAttendance);
  
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
    console.log(attendanceList);
    return (
      <>
        <div>Attendance</div>
        {
          attendanceList && attendanceList.length === 0 && <div>No attendance marked</div>
        }
        <Button onClick={() => navigate(`/event/attendance/edit/${eventId}`)}>{attendanceList.length===0 ? 'Add':'Update'}</Button>
        <Button onClick={() => navigate(`/event/${eventId}`)}>Back</Button>
        {attendanceList &&
          attendanceList.length > 0 && Array.isArray(attendanceList) &&
          attendanceList.map((attendance) => {
            return (
              <div key={attendance.userId}>
                <div>{attendance.user.firstName + " "+ attendance.user.lastName}</div>
                <div>{attendance.status}</div>
              </div>
            );
          })}
  
      </> 
    );
}

export default EventAttendance