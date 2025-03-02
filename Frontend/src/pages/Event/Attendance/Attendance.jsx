// this will display attendance of one event || display users list of one event || Registered + Unregistered users list of one event
import React from 'react';
import { EventAttendance,EventUnregisteredAttendace } from '../../../components';
function Attendance() {
  return (
    <div>
      <EventAttendance />
      <EventUnregisteredAttendace/>
      
    </div>
  )
}

export default Attendance
