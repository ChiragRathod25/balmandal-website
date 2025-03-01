import { useNavigate } from 'react-router-dom';

function UserAchievementCard({ achievement, handleClick, isUsedWithModal = false }) {
  const navigate = useNavigate();
  const handleCardClick = (achievement) => {
    if (isUsedWithModal) {
      handleClick(achievement);
    } else {
      navigate(`/achievement/${achievement._id}`);
    }
  };

  const getHeroImage = (achievement) => {
    // let hero =
    //   'https://plus.unsplash.com/premium_photo-1683749809341-23a70a91b195?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWNoaWV2ZW1lbnR8ZW58MHx8MHx8fDA%3D';

    let hero = '/achievementHero.avif';
    const files = achievement?.images;
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


  return achievement ? (
    <div
      key={achievement?._id}
      className="flex flex-col sm:flex-row justify-between items-center 
      bg-rgba(255,255,255,0.8)
      p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all"
      onClick={() => handleCardClick(achievement)}
    >
      {/* Image & Title */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
          
          <img
            src={getHeroImage(achievement)}
            alt={achievement?.title}
            className="w-14 h-14 object-cover rounded-md border border-gray-300"
          />
     
        <p className="font-semibold text-lg text-center sm:text-left">{achievement?.title}</p>
      </div>

      {/* Buttons */}
      {/* <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-center sm:justify-end">
        <Button
          onClick={() => navigate(`/achievement/${achievement._id}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          View
        </Button>
        <Button
          onClick={() => handleEdit(achievement)}
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(achievement?._id)}
          className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
        >
          Delete
        </Button>
      </div> */}
    </div>
  ) : null;
}

export default UserAchievementCard;
