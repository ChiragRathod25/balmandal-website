import  { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { Button, QueryHandler } from '../../components';

function AllEvent() {

  const navigate = useNavigate();

  const fetchAllEvents = useCallback(() => databaseService.getEvents(), []);
  const { loading, error, data:events } = useCustomReactQuery(fetchAllEvents);

 

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await databaseService.deleteEvent({ eventId });
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
      console.log('Event Deleted');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getHeroImage = (event) => {
    let hero = 'https://plus.unsplash.com/premium_photo-1683749809341-23a70a91b195?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWNoaWV2ZW1lbnR8ZW58MHx8MHx8fDA%3D';
    const files = event?.media;
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.includes('image')) {
          hero = file;
          return hero;
        }
      }
    }
    return hero;
  };

  return (
    <QueryHandler queries={[{ loading, error }]}> 
      <div className="container mx-auto p-4">
        {Array.isArray(events) && events.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Events</h2>
            <div className="w-full">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4 lg:flex-row flex-col text-center lg:text-left"
                >
                  <div className="flex items-center gap-4 flex-col lg:flex-row">
                    <img
                      src={getHeroImage(event)}
                      alt={event.title || 'Event'}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.startAt).toLocaleDateString()} {new Date(event.startAt).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-500">{event.venue}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 lg:mt-0">
                    <Button
                      onClick={() => navigate(`/event/${event._id}`)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => navigate(`/event/edit/${event._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/event/add')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add Event
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default AllEvent;
