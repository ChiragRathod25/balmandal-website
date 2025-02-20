// to get all notifications of the user ,
// if user?='id', user notificatinos 
// createdBy?='id' for getNotificationsByCreaterId
import React, { useCallback, useEffect, useState } from 'react'
import databaseService from '../../services/database.services'
import { useSelector } from 'react-redux'

import useCustomReactQuery from "../../utils/useCustomReactQuery"

function AllNotifications() {
    const [Notifications,setNotifications]=useState([])
    const userId=useSelector((state)=>state.auth.userData._id);
    const fetchNotifications=useCallback(()=>databaseService.getUserNotifications(userId),[])

    const {loading,data,error}=useCustomReactQuery(fetchNotifications)
    useEffect(()=>{
        if(data){
            setNotifications(data);
        }
    },[data])


    return (
   
        <>
            {
                Notifications.length > 0 && 
                Notifications.map((notification)=>(
                    <div key={notification._id}  className='p-2'>
                        <p>
                            Title: {notification?.title}
                        </p>
                    </div>
                ))
            }
        </>
  )
}

export default AllNotifications