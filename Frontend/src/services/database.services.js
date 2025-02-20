import axiosInstace from '../utils/axios';
import { handleApiRequest } from '../utils/apiHelper';
import toast from 'react-hot-toast';

export class DatabaseService {
  async register({ firstName, lastName, mobile, password }) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/user/register', {
            firstName,
            lastName,
            mobile,
            password,
          }),
        'register'
      ),
      {
        loading: 'Registering',
        success: 'Registered successfully',
        error: 'Error while registering',
      },
      {
        id: 'register',
      }
    );
  }
  async login({ firstName, mobile, password }) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/user/login', {
            firstName,
            mobile,
            password,
          }),
        'login'
      ),
      {
        loading: 'Logging in',
        success: 'Logged in',
        error: 'Error while logging in',
      },
      {
        id: 'login',
      }
    );
  }
  async updateUserDetails(
    { firstName, lastName, middleName, email, mobile, DOB, school, std, mediumOfStudy },
    userId = null
  ) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/user/updateuserDetails?userId=${userId}`, {
              firstName,
              lastName,
              middleName,
              email,
              mobile,
              DOB,
              school,
              std,
              mediumOfStudy,
            }),
          'updateUserDetails'
        ),
        {
          loading: 'Updating',
          success: 'Updated successfully',
          error: 'Error while updating',
        },
        {
          id: 'updateUserDetails',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put('/api/v1/user/updateuserDetails', {
            firstName,
            lastName,
            middleName,
            email,
            mobile,
            DOB,
            school,
            std,
            mediumOfStudy,
          }),
        'updateUserDetails'
      ),
      {
        loading: 'Updating',
        success: 'Updated successfully',
        error: 'Error while updating',
      },
      {
        id: 'updateUserDetails',
      }
    );
  }
  async updateAvatar({ avatar }, userId = null) {
    const formData = new FormData();
    formData.append('avatar', avatar[0]);

    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/user/updateAvatar?userId=${userId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
          'updateAvatar'
        ),
        {
          loading: 'Updating',
          success: 'Updated successfully',
          error: 'Error while updating',
        },
        {
          id: 'updateAvatar',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put('/api/v1/user/updateAvatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateAvatar'
      ),
      {
        loading: 'Updating',
        success: 'Updated successfully',
        error: 'Error while updating',
      },
      {
        id: 'updateAvatar',
      }
    );
  }
  async updatePassword({ password, newPassword }, userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/updatePassword?userId=${userId}`, {
              password,
              newPassword,
            }),
          'updatePassword'
        ),
        {
          loading: 'Updating',
          success: 'Password Updated successfully',
          error: 'Error while updating password',
        },
        {
          id: 'updatePassword',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put('/api/v1/user/updatePassword', {
            password,
            newPassword,
          }),
        'updatePassword'
      ),
      {
        loading: 'Updating',
        success: 'Password Updated successfully',
        error: 'Error while updating password',
      },
      {
        id: 'updatePassword',
      }
    );
  }
  async getCurrentuser() {
    return handleApiRequest(
      () => axiosInstace.get('/api/v1/user/getCurrentuser'),
      'getCurrentUser'
    );
  }
  async refreshAceesToken() {
    return handleApiRequest(
      () => axiosInstace.post('/api/v1/user/refreshAceesToken'),
      'refreshAceesToken'
    );
  }
  async logout() {
    return toast.promise(
      handleApiRequest(() => axiosInstace.post('/api/v1/user/logout'), 'logout'),
      {
        loading: 'Logging out',
        success: 'Logged out',
        error: 'Error while logging out',
      },
      {
        id: 'logout',
      }
    );
  }

  async deleteFile({ deleteUrl }, userId) {
    console.log('Client Url', deleteUrl);

    const config = {
      headers: { 'Content-Type': 'application/json' }, // Ensure JSON is sent
      data: { url: deleteUrl }, // Must be inside `data` for DELETE requests
    };

    if (userId) {
      return toast.promise(
        handleApiRequest(
          () => axiosInstace.delete(`/api/v1/admin/user/deleteFile?userId=${userId}`, config),
          'deleteFile'
        ),
        {
          loading: 'Deleting File',
          success: 'File Deleted successfully',
          error: 'Error while deleting file',
        },
        {
          id: 'deleteFile',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () => axiosInstace.delete(`/api/v1/user/deleteFile`, config), // Pass `data` in `config`
        'deleteFile'
      ),
      {
        loading: 'Deleting File',
        success: 'File Deleted successfully',
        error: 'Error while deleting file',
      },
      {
        id: 'deleteFile',
      }
    );
  }

  async getUserById(userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(() => axiosInstace.get(`/api/v1/admin/user/${userId}`), 'getUserById'),
        {
          loading: 'Getting User Details',
          success: 'User Details Fetched successfully',
          error: 'Error while fetching user',
        },
        {
          id: 'getUserById',
        }
      );
    }
  }

  async getUserAchivements(userId = null) {
    //if userId is passed then it will return all achievements of the user
    //and also check if the user is admin or not
    if (userId != null) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/achievement?userId=${userId}`),
        'getUserAchivements'
      );
    }

    //if userId is not passed then it will return all achievements of the logged in user
    return handleApiRequest(() => axiosInstace.get('/api/v1/achievement'), 'getUserAchivements');
  }

  async getAchievementById({ achievementId }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/achievement/${achievementId}?userId=${userId}`),
        'getAchievementById'
      );
    }
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/achievement/${achievementId}`),
      'getAchievementById'
    );
  }

  async addAchievement({ title, description, image }, userId = null) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.post(`/api/v1/admin/achievement?userId=${userId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
          'addAchievement'
        ),
        {
          loading: 'Adding Achievement',
          success: 'Achievement Added successfully',
          error: 'Error while adding achievement',
        },
        {
          id: 'addAchievement',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/achievement', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'addAchievement'
      ),
      {
        loading: 'Adding Achievement',
        success: 'Achievement Added successfully',
        error: 'Error while adding achievement',
      },
      {
        id: 'addAchievement',
      }
    );
  }

  async updateAchivement({ title, description, image, cloudFiles }, achievementId, userId = null) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    formData.append('cloudFiles', cloudFiles);
    console.log('Formdata', formData);
    console.log('Images', image);

    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(
              `/api/v1/admin/achievement/${achievementId}?userId=${userId}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            ),
          'updateAchivement'
        ),
        {
          loading: 'Updating Achievement',
          success: 'Achievement Updated successfully',
          error: 'Error while updating achievement',
        },
        {
          id: 'updateAchivement',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/achievement/${achievementId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateAchivement'
      ),
      {
        loading: 'Updating Achievement',
        success: 'Achievement Updated successfully',
        error: 'Error while updating achievement',
      },
      {
        id: 'updateAchivement',
      }
    );
  }
  async deleteAchivement({ achievementId }, userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () => axiosInstace.delete(`/api/v1/admin/achievement/${achievementId}?userId=${userId}`),
          'deleteAchivement'
        ),
        {
          loading: 'Deleting Achievement',
          success: 'Achievement Deleted successfully',
          error: 'Error while deleting achievement',
        },
        {
          id: 'deleteAchivement',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () => axiosInstace.delete(`/api/v1/achievement/${achievementId}`),
        'deleteAchivement'
      ),
      {
        loading: 'Deleting Achievement',
        success: 'Achievement Deleted successfully',
        error: 'Error while deleting achievement',
      },
      {
        id: 'deleteAchivement',
      }
    );
  }

  async getUserParents(userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/parent?userId=${userId}`),
        'getUserParents'
      );
    }
    return handleApiRequest(() => axiosInstace.get('/api/v1/parent'), 'getUserParents');
  }
  async addParentDetails(
    { role, fullName, email, mobileNumber, occupationType, occupationTitle, occupationAddress },
    userId = null
  ) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.post(`/api/v1/admin/parent?userId=${userId}`, {
              role,
              fullName,
              email,
              mobileNumber,
              occupationType,
              occupationTitle,
              occupationAddress,
            }),
          'addParentDetails'
        ),
        {
          loading: 'Adding Parent',
          success: 'Parent Added successfully',
          error: 'Error while adding parent',
        },
        {
          id: 'addParentDetails',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/parent', {
            role,
            fullName,
            email,
            mobileNumber,
            occupationType,
            occupationTitle,
            occupationAddress,
          }),
        'addParentDetails'
      ),
      {
        loading: 'Adding Parent',
        success: 'Parent Added successfully',
        error: 'Error while adding parent',
      },
      {
        id: 'addParentDetails',
      }
    );
  }

  async updateParentDetails(
    { role, fullName, email, mobileNumber, occupationType, occupationTitle, occupationAddress },
    parentId,
    userId = null
  ) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/parent/${parentId}?userId=${userId}`, {
              role,
              fullName,
              email,
              mobileNumber,
              occupationType,
              occupationTitle,
              occupationAddress,
            }),
          'updateParentDetails'
        ),
        {
          loading: 'Updating Parent',
          success: 'Parent Updated successfully',
          error: 'Error while updating parent',
        },
        {
          id: 'updateParentDetails',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/parent/${parentId}`, {
            role,
            fullName,
            email,
            mobileNumber,
            occupationType,
            occupationTitle,
            occupationAddress,
          }),
        'updateParentDetails'
      ),
      {
        loading: 'Updating Parent',
        success: 'Parent Updated successfully',
        error: 'Error while updating parent',
      },
      {
        id: 'updateParentDetails',
      }
    );
  }

  async getParentDetailsById({ parentId }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/parent/${parentId}?userId=${userId}`),
        'getParentDetailsById'
      );
    }

    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/parent/${parentId}`),
      'getParentDetailsById'
    );
  }
  async deleteParentDetails({ parentId }, userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () => axiosInstace.delete(`/api/v1/admin/parent/${parentId}?userId=${userId}`),
          'deleteParentDetails'
        ),
        {
          loading: 'Deleting Parent',
          success: 'Parent Deleted successfully',
          error: 'Error while deleting parent',
        },
        {
          id: 'deleteParentDetails',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.delete(`/api/v1/parent/${parentId}`),
        'deleteParentDetails'
      ),
      {
        loading: 'Deleting Parent',
        success: 'Parent Deleted successfully',
        error: 'Error while deleting parent',
      },
      {
        id: 'deleteParentDetails',
      }
    );
  }

  async getUserTalents(userId = null) {
    console.log('userId', userId);
    console.log('userId', typeof userId);

    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/talent?userId=${userId}`),
        'getUserTalents'
      );
    }

    return handleApiRequest(() => axiosInstace.get('/api/v1/talent'), 'getUserTalents');
  }
  async getTalentById({ talentId }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/talent/${talentId}?userId=${userId}`),
        'getTalentById'
      );
    }
    return handleApiRequest(() => axiosInstace.get(`/api/v1/talent/${talentId}`), 'getTalentById');
  }
  async addTalent({ heading, description, image }, userId = null) {
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('description', description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.post(`/api/v1/admin/talent?userId=${userId}`, {
              heading,
              description,
              image,
            }),
          'addTalent'
        ),
        {
          loading: 'Adding Talent',
          success: 'Talent Added successfully',
          error: 'Error while adding talent',
        },
        {
          id: 'addTalent',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/talent', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'addTalent'
      ),
      {
        loading: 'Adding Talent',
        success: 'Talent Added successfully',
        error: 'Error while adding talent',
      },
      {
        id: 'addTalent',
      }
    );
  }
  async updateTalent({ heading, description, image, cloudFiles }, talentId, userId = null) {
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('description', description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    formData.append('cloudFiles', cloudFiles);
    console.log('Images', image);
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/talent/${talentId}?userId=${userId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
          'updateTalent'
        ),
        {
          loading: 'Updating Talent',
          success: 'Talent Updated successfully',
          error: 'Error while updating talent',
        },
        {
          id: 'updateTalent',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/talent/${talentId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateTalent'
      ),
      {
        loading: 'Updating Talent',
        success: 'Talent Updated successfully',
        error: 'Error while updating talent',
      },
      {
        id: 'updateTalent',
      }
    );
  }

  async deleteTalent({ talentId }, userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () => axiosInstace.delete(`/api/v1/admin/talent/${talentId}?userId=${userId}`),
          'deleteTalent'
        ),
        {
          loading: 'Deleting Talent',
          success: 'Talent Deleted successfully',
          error: 'Error while deleting talent',
        },
        {
          id: 'deleteTalent',
        }
      );
    }
    return toast.promise(
      handleApiRequest(() => axiosInstace.delete(`/api/v1/talent/${talentId}`), 'deleteTalent'),
      {
        loading: 'Deleting Talent',
        success: 'Talent Deleted successfully',
        error: 'Error while deleting talent',
      },
      {
        id: 'deleteTalent',
      }
    );
  }

  async fetchAllUsers() {
    return toast.promise(
      handleApiRequest(() => axiosInstace.get('/api/v1/admin/all-users'), 'fetchAllUsers'),
      {
        loading: 'Fetching Users',
        success: 'All Users Fetched successfully',
        error: 'Error while fetching users',
      },
      {
        id: 'fetchAllUsers',
      }
    );
  }

  async addEvent({ title, description, media, cloudMediaFiles, startAt, endAt, venue }) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (media && media.length > 0) {
      Array.from(media).forEach((img) => formData.append('media', img));
    }
    formData.append('cloudMediaFiles', cloudMediaFiles);
    formData.append('startAt', startAt);
    formData.append('endAt', endAt);
    formData.append('venue', venue);

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/event', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'addEvent'
      ),
      {
        loading: 'Adding Event',
        success: 'Event Added successfully',
        error: 'Error while adding event',
      },
      {
        id: 'addEvent',
      }
    );
  }
  async updateEvent({ title, description, media, cloudMediaFiles }, eventId) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (media && media.length > 0) {
      Array.from(media).forEach((img) => formData.append('media', img));
    }
    formData.append('cloudMediaFiles', cloudMediaFiles);
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/event/${eventId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateEvent'
      ),
      {
        loading: 'Updating Event',
        success: 'Event Updated successfully',
        error: 'Error while updating event',
      },
      {
        id: 'updateEvent',
      }
    );
  }

  async deleteEvent({ eventId }) {
    return toast.promise(
      handleApiRequest(() => axiosInstace.delete(`/api/v1/event/${eventId}`), 'deleteEvent'),
      {
        loading: 'Deleting Event',
        success: 'Event Deleted successfully',
        error: 'Error while deleting event',
      },
      {
        id: 'deleteEvent',
      }
    );
  }
  async getEvents() {
    return handleApiRequest(() => axiosInstace.get('/api/v1/event'), 'getEvents');
  }
  async getEventById({ eventId }) {
    return handleApiRequest(() => axiosInstace.get(`/api/v1/event/${eventId}`), 'getEventById');
  }

  async getAllNotifications() {
    return handleApiRequest(() => axiosInstace.get('/api/v1/notification'), 'getAllNotifications');
  }

  async createNotification({
    createdFor,
    isBroadcast,
    targetGroup,
    title,
    message,
    notificatinoType,
    link,
    poster,
    isReadBy,
    deliveredTo,
  }) {
    const formData = new FormData();
    formData.append('createdFor', createdFor);
    formData.append('isBroadcast', isBroadcast);
    formData.append('targetGroup', targetGroup);
    formData.append('title', title);

    formData.append('message', message);
    formData.append('notificatinoType', notificatinoType);
    formData.append('link', link);
    formData.append('isReadBy', isReadBy);
    formData.append('deliveredTo', deliveredTo);
    if (poster && poster.length > 0) {
      Array.from(poster).forEach((img) => formData.append('poster', img));
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/admin/notification', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'createNotification'
      ),
      {
        loading: 'Creating Notification',
        success: 'Notification Created successfully',
        error: 'Error while creating notification',
      },
      {
        id: 'createNotification',
      }
    );
  }

  async getUserNotifications({ userId }) {
    if (userId != null) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/notification/user?userId=${userId}`),
        'getUserNotifications'
      );
    }
    return handleApiRequest(
      () => axiosInstace.get('/api/v1/notification/user'),
      'getUserNotifications'
    );
  }

  async getNotificationsByCreaterId() {
    return handleApiRequest(
      () => axiosInstace.get('/api/v1/admin/notification/creater'),
      'getNotificationsByCreaterId'
    );
  }
  async getNotificationById({ notificationId }) {
    console.log('notificationId', notificationId);
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/notification/${notificationId}`),
      'getNotificationById'
    );
  }

  async createSubscription({ subscription }) {
    console.log('Creating subscription in db',{subscription});
    return handleApiRequest(
      () => axiosInstace.post(`/api/v1/subscription/add`, { subscription }),
      'createSubscription'
    );
  }
}

const databaseService = new DatabaseService();
export default databaseService;
