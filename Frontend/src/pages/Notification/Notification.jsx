// to display the notification and confirm the notification
import React, { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { Button, QueryHandler } from '../../components';
import { useSelector } from 'react-redux';

function Notification() {
  const [Notification, setNotification] = useState({});
  const { notificationId } = useParams();
  console.log('Notification Id', notificationId);
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const fetchNotification = useCallback(
    () => databaseService.getNotificationById({notificationId}),
    [notificationId]
  );
  const navigate = useNavigate();

  const { loading, data, error } = useCustomReactQuery(fetchNotification);
  useEffect(() => {
    if (data) {
      setNotification(data);
      
    }
  }, [data]);
  // useEffect(() => {
  // console.log('Rendernig page...');
  // }, [navigate, notificationId]);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <p>Title: {Notification?.title}</p>
      <p>message: {Notification?.message}</p>
      <p>createdBy: {Notification?.createdBy}</p>
      {/* // All other notification details  */}

      {isAdmin && <></>}

      <div>Notification</div>
    </QueryHandler>
  );
}

export default Notification;
