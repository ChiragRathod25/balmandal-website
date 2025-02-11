import axiosInstace from '../utils/axios';
import { handleApiRequest } from '../utils/apiHelper';

export class DatabaseService {
  async register({ firstName, lastName, mobile, password }) {
    return handleApiRequest(
      () =>
        axiosInstace.post('/api/v1/user/register', {
          firstName,
          lastName,
          mobile,
          password,
        }),
      'register'
    );
  }
  async login({ firstName, mobile, password }) {
    return handleApiRequest(
      () =>
        axiosInstace.post('/api/v1/user/login', {
          firstName,
          mobile,
          password,
        }),
      'login'
    );
  }
  async updateUserDetails(
    { firstName, lastName, middleName, email, mobile, DOB, school, std, mediumOfStudy },
    userId = null
  ) {
    if (userId) {
      return handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/admin/updateuserDetails?userId=${userId}`, {
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
      );
    }
    return handleApiRequest(
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
    );
  }
  async updateAvatar({ avatar }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () =>
          axiosInstace.put(
            `/api/v1/admin/updateAvatar?userId=${userId}`,
            { avatar },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          ),
        'updateAvatar'
      );
    }
    return handleApiRequest(
      () =>
        axiosInstace.put(
          '/api/v1/user/updateAvatar',
          { avatar },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ),
      'updateAvatar'
    );
  }
  async updatePassword({ password, newPassword }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/admin/updatePassword?userId=${userId}`, {
            password,
            newPassword,
          }),
        'updatePassword'
      );
    }
    return handleApiRequest(
      () =>
        axiosInstace.put('/api/v1/user/updatePassword', {
          password,
          newPassword,
        }),
      'updatePassword'
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
    return handleApiRequest(() => axiosInstace.post('/api/v1/user/logout'), 'logout');
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
      return handleApiRequest(
        () =>
          axiosInstace.post(`/api/v1/admin/achievement?userId=${userId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'addAchievement'
      );
    }
    return handleApiRequest(
      () =>
        axiosInstace.post('/api/v1/achievement', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      'addAchievement'
    );
  }

  async updateAchivement({ title, description, image }, achievementId, userId = null) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    if (userId) {
      return handleApiRequest(
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
      );
    }
    
    return handleApiRequest(
      () =>
        axiosInstace.put(`/api/v1/achievement/${achievementId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      'updateAchivement'
    );
  }
  async deleteAchivement({ achievementId }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.delete(`/api/v1/admin/achievement/${achievementId}?userId=${userId}`),
        'deleteAchivement'
      );
    }

    return handleApiRequest(
      () => axiosInstace.delete(`/api/v1/achievement/${achievementId}`),
      'deleteAchivement'
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
  async addParentDetails({ role, fullName, email, mobileNumber, occupation }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () =>
          axiosInstace.post(`/api/v1/admin/parent?userId=${userId}`, {
            role,
            fullName,
            email,
            mobileNumber,
            occupation,
          }),
        'addParentDetails'
      );
    }

    return handleApiRequest(
      () =>
        axiosInstace.post('/api/v1/parent', {
          role,
          fullName,
          email,
          mobileNumber,
          occupation,
        }),
      'addParentDetails'
    );
  }

  async updateParentDetails(
    { role, fullName, email, mobileNumber, occupation },
    parentId,
    userId = null
  ) 
  {
    if (userId) {
      return handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/admin/parent/${parentId}?userId=${userId}`, {
            role,
            fullName,
            email,
            mobileNumber,
            occupation,
          }),
        'updateParentDetails'
      );
    }
    return handleApiRequest(
      () =>
        axiosInstace.put(`/api/v1/parent/${parentId}`, {
          role,
          fullName,
          email,
          mobileNumber,
          occupation,
        }),
      'updateParentDetails'
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
      return handleApiRequest(
        () => axiosInstace.delete(`/api/v1/admin/parent/${parentId}?userId=${userId}`),
        'deleteParentDetails'
      );
    }

    return handleApiRequest(
      () => axiosInstace.delete(`/api/v1/parent/${parentId}`),
      'deleteParentDetails'
    );
  }

  async getUserTalents(userId = null) {
    console.log("userId",userId);
    console.log("userId",typeof userId);
    
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
      return handleApiRequest(
        () =>
          axiosInstace.post(`/api/v1/admin/talent?userId=${userId}`, {
            heading,
            description,
            image,
          }),
        'addTalent'
      );
    }

    return handleApiRequest(
      () =>
        axiosInstace.post('/api/v1/talent', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      'addTalent'
    );
  }
  async updateTalent({ heading, description, image }, talentId, userId = null) {
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('description', description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    if (userId) {
      return handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/admin/talent/${talentId}?userId=${userId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateTalent'
      );
    }
    return handleApiRequest(
      () =>
        axiosInstace.put(`/api/v1/talent/${talentId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      'updateTalent'
    );
  }

  async deleteTalent({ talentId }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.delete(`/api/v1/admin/talent/${talentId}?userId=${userId}`),
        'deleteTalent'
      );
    }
    return handleApiRequest(
      () => axiosInstace.delete(`/api/v1/talent/${talentId}`),
      'deleteTalent'
    );
  }
}
const databaseService = new DatabaseService();
export default databaseService;
