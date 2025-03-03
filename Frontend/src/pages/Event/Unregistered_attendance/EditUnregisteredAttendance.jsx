import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { UnregisteredAttendanceForm } from '../../../components'
import databaseService from '../../../services/database.services'
import useCustomReactQuery from '../../../utils/useCustomReactQuery'

function EditUnregisteredAttendance() {
    const {eventId}=useParams()
    const {unregisteredAttendanceId}=useParams()
    const fetchUnregisteredAttendance=useCallback(()=>databaseService.getUnregisteredAttendanceById({unregisteredAttendanceId}),[unregisteredAttendanceId])
    const {data:unregisteredAttendance,loading,error}=useCustomReactQuery(fetchUnregisteredAttendance)
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
    <div>EditUnregisteredAttendance</div>
    <UnregisteredAttendanceForm UnregisteredAttendance={unregisteredAttendance}/>

    </>

  )
}

export default EditUnregisteredAttendance