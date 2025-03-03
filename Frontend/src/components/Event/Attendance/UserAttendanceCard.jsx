// % wise display of users attendance for each event type
import React, { useCallback } from 'react';

function UserAttendanceCard({ attendance }) {
  const getPercentage = (total, present) => {
    return (present / total) * 100;
  };

  if (!attendance) {
    return <div>No Attendance</div>;
  }

  return (
    <>
      <div>UserAttendanceCard</div>
    {
      attendance && (
        <div>
          <div>{attendance.eventType}</div>
          <div>{attendance.total}</div>
          <div>{attendance.present}</div>
          <div>{attendance.absent}</div>
          <div>{getPercentage(attendance.total, attendance.present)}</div>
        </div>
      )
    }
    </>
  );
}

export default UserAttendanceCard;
