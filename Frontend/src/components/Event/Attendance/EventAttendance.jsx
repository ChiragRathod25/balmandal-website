// this will display all the registered attendies of one event list view,
// if click on that redirect to the user profile page where we can see the details of that user and we can also delete and edit that user
import React, { useCallback } from 'react';
import { Button } from '../../index';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../../services/database.services';
import useCustomReactQuery from '../../../utils/useCustomReactQuery';

function EventAttendance() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const fetchAttendance = useCallback(
    () => databaseService.getAttendanceByEventId({ eventId }),
    [eventId]
  );

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Attendance</h2>

      {attendanceList?.length === 0 ? (
        <div className="text-center text-gray-600 mb-4">No attendance marked</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attendanceList?.map((attendance) => (
            <div
              key={attendance.userId}
              className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition cursor-pointer"
              onClick={() => navigate(`/dashboard/user/${attendance.userId}`)}
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {attendance.user.firstName} {attendance.user.lastName}
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full 
                  ${attendance.status === 'present' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
              >
                {attendance.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Buttons Section */}
      <div className="mt-6 flex gap-4">
        <Button onClick={() => navigate(`/event/attendance/edit/${eventId}`)}>
          {attendanceList.length === 0 ? 'Add' : 'Update'}
        </Button>
        <Button onClick={() => navigate(`/event/${eventId}`)}>Back</Button>
      </div>
    </div>
  );
}

export default EventAttendance;
