// this will display unregistered attendies of one event list view, 
// if click on that redirect to the unregistered attendies details page 
// where we can see the details of that unregistered attendies and we can also delete and edit that unregistered attendies 
// and also we can add the new unregistered attendies
import React,{useCallback} from 'react'
import {Button} from '../../'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import databaseService from '../../../services/database.services'
import useCustomReactQuery from '../../../utils/useCustomReactQuery'


function EventUnregisteredAttendace() {
  const navigate = useNavigate()
  const { eventId } = useParams();
  const fetchEventUnregisteredAttendace = useCallback(()=>databaseService.getUnregisteredAttendanceByEventId({eventId}),[eventId])
  const {data:unregisteredAttendace,loading,error}=useCustomReactQuery(fetchEventUnregisteredAttendace)


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
    <div>EventUnregisteredAttendace</div>
    {
      unregisteredAttendace && unregisteredAttendace.length === 0 && <div>No Unregistered Attendance</div>
    }
    {
      unregisteredAttendace && unregisteredAttendace.length > 0 && Array.isArray(unregisteredAttendace) &&
      unregisteredAttendace.map((unregisteredAttendace) => {
        return (
          <div key={unregisteredAttendace._id}>
            <div>{unregisteredAttendace.fullName}</div>
            <div>{unregisteredAttendace.mobile}</div>
            <div>{unregisteredAttendace.email}</div>
            <div>{unregisteredAttendace.remark}</div>
            <div>{unregisteredAttendace.status}</div>
            <Button onClick={() => navigate(`/event/attendance/unregistered/${unregisteredAttendace._id}`)}>View</Button>
          </div>
        );
      })
    }
    
   
    <Button onClick={() => navigate(`/event/attendance/unregistered/add/${eventId}`)}>Add Unregistered Attendace</Button>

    </>
  )
}

export default EventUnregisteredAttendace