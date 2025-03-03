// this will display attendance of one event || display users list of one event || Registered + Unregistered users list of one event
import React from 'react';
import { EventAttendance,EventUnregisteredAttendace } from '../../../components';
function Attendance() {
  return (
    <div>
      <EventAttendance />
      <hr  className='
      border-t-2
      border-gray-300
      my-4
      w-3/4
      mx-auto
      
      '/>
      <EventUnregisteredAttendace/>
      
    </div>
  )
}

export default Attendance
