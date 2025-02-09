import axiosInstace from "../utils/axios";
import { handleApiRequest } from "../utils/apiHelper";
export class DatabaseService {
  async register({ firstName, lastName, mobile, password }) {
    return handleApiRequest(
      () =>
        axiosInstace.post("/api/v1/balak/register", {
          firstName,
          lastName,
          mobile,
          password,
        }),
      "register"
    );
  }
  async login({ firstName, mobile, password }) {
    return handleApiRequest(
      () =>
        axiosInstace.post("/api/v1/balak/login", {
          firstName,
          mobile,
          password,
        }),
      "login"
    );
  }
  async updateUserDetails({
    firstName,
    lastName,
    middleName,
    email,
    mobile,
    DOB,
    school,
    std,
    mediumOfStudy,
  }) {
    return handleApiRequest(
      () =>
        axiosInstace.put("/api/v1/balak/updateuserDetails", {
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
      "updateUserDetails"
    );
  }
  async updateAvatar({ avatar }) {
    return handleApiRequest(
      () =>
        axiosInstace.put(
          "/api/v1/balak/updateAvatar",
          { avatar },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
      "updateAvatar"
    );
  }
  async updatePassword({ password, newPassword }) {
    return handleApiRequest(
      () =>
        axiosInstace.put("/api/v1/balak/updatePassword", {
          password,
          newPassword,
        }),
      "updatePassword"
    );
  }
  async getCurrentuser() {
    return handleApiRequest(
      () => axiosInstace.get("/api/v1/balak/getCurrentuser"),
      "getCurrentUser"
    );
  }
  async refreshAceesToken() {
    return handleApiRequest(
      () => axiosInstace.post("/api/v1/balak/refreshAceesToken"),
      "refreshAceesToken"
    );
  }
  async logout() {
    return handleApiRequest(
      () => axiosInstace.post("/api/v1/balak/logout"),
      "logout"
    );
  }

  async getUserAchivements() {
    return handleApiRequest(
      () => axiosInstace.get("/api/v1/achievement"),
      "getUserAchivements"
    );
  }
  async getAchievementById({ achievementId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/achievement/${achievementId}`),
      "getAchievementById"
    );
  }
  async addAchievement({ title, description, image }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append("image", img));
    }
    return handleApiRequest(
      () =>
        axiosInstace.post("/api/v1/achievement", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      "addAchievement"
    );
  }
  async updateAchivement({ title, description, image }, achievementId) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append("image", img));
    }
    return handleApiRequest(
      () =>
        axiosInstace.put(`/api/v1/achievement/${achievementId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      "updateAchivement"
    );
  }
  async deleteAchivement({ achievementId }) {
    return handleApiRequest(
      () => axiosInstace.delete(`/api/v1/achievement/${achievementId}`),
      "deleteAchivement"
    );
  }

  async getUserParents() {
    return handleApiRequest(
      () => axiosInstace.get("/api/v1/parent"),
      "getUserParents"
    );
  }
  async addParentDetails({ role, fullName, email, mobileNumber, occupation }) {
    console.log({ role, fullName, email, mobileNumber, occupation });

    return handleApiRequest(
      () =>
        axiosInstace.post("/api/v1/parent", {
          role,
          fullName,
          email,
          mobileNumber,
          occupation,
        }),
      "addParentDetails"
    );
  }
  async updateParentDetails(
    { role, fullName, email, mobileNumber, occupation },
    parentId
  ) {
    return handleApiRequest(
      () =>
        axiosInstace.put(`/api/v1/parent/${parentId}`, {
          role,
          fullName,
          email,
          mobileNumber,
          occupation,
        }),
      "updateParentDetails"
    );
  }
  async getParentDetailsById({ parentId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/parent/${parentId}`),
      "getParentDetailsById"
    );
  }
  async deleteParentDetails({ parentId }) {
    return handleApiRequest(
      () => axiosInstace.delete(`/api/v1/parent/${parentId}`),
      "deleteParentDetails"
    );
  }

  async getUserTalents() {
    return handleApiRequest(
      () => axiosInstace.get("/api/v1/talent"),
      "getUserTalents"
    );
  }
  async getTalentById({ talentId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/talent/${talentId}`),
      "getTalentById"
    );
  }
  async addTalent({ heading, description, image }) {
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append("image", img));
    }
    return handleApiRequest(
      () =>
        axiosInstace.post("/api/v1/talent", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      "addTalent"
    );
  }
  async updateTalent({ heading, description, image }, talentId) {
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append("image", img));
    }

    return handleApiRequest(
      () =>
        axiosInstace.put(`/api/v1/talent/${talentId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      "updateTalent"
    );
  }
  
  async deleteTalent({ talentId }) {
    return handleApiRequest(
      () => axiosInstace.delete(`/api/v1/talent/${talentId}`),
      "deleteTalent"
    );
  }
}
const databaseService = new DatabaseService();
export default databaseService;
