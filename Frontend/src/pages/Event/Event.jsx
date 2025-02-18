import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QueryHandler, Button, FilesDisplayHelper } from '../../components';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';

function Event() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const fetchEvent = useCallback(() => databaseService.getEventById({ eventId }), [eventId]);
  const { data, loading, error } = useCustomReactQuery(fetchEvent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!eventId) {
      navigate('/');
      return;
    }
    if (data) {
      setEvent(data);
    }
  }, [eventId, data, navigate]);
  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    try {
      await databaseService.deleteEvent({ eventId });
      navigate('/event');
      console.log('Event Deleted');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {event && (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4">
  <span className="text-blue-600">{event?.title}</span>
  <span 
    className={`px-3 py-1 text-sm font-medium rounded-full shadow-md ${
      event?.status === 'active' 
        ? 'bg-green-100 text-green-600 border border-green-300' 
        : 'bg-red-100 text-red-600 border border-red-300'
    }`}
  >
    {event?.status}
  </span>
</h2>


          <div className="space-y-3 text-gray-700">
        
            <p>
              <span className="font-semibold">Description:</span> {event?.description}
            </p>
            <p>
              <span className="font-semibold">Venue:</span> {event?.venue}
            </p>
            <p>
              <span className="font-semibold">Start:</span>{' '}
              {new Date(event?.startAt).toLocaleDateString()} | {new Date(event?.startAt).toLocaleTimeString()}
            </p>
            <p>
              <span className="font-semibold">End:</span>{' '}
              {new Date(event?.endAt).toLocaleDateString()} | {new Date(event?.endAt).toLocaleTimeString()}
            </p>
            <p>
              <span className="font-semibold">Created By:</span> {event?.createdBy}
            </p>
           
          </div>

          {/* File Display Section */}
          {event?.media  && event?.media?.length>0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Media</h3>
              <FilesDisplayHelper cloudFiles={event?.media} />
            </div>
          )}



<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-start">
                            <Button
                                onClick={() => navigate(`/event/edit/${event._id}`)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                            >
                                Edit Event
                            </Button>
                            <Button
                                onClick={() => handleDelete(event?._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                            >
                                Delete Event
                            </Button>
                            <Button
                                onClick={() => navigate('/event')}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                            >
                                Manage Events
                            </Button>
                        </div>
        </div>
      )}
    </QueryHandler>
  );
}

export default Event;
