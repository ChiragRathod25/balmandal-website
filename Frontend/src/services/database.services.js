import axiosInstace from "../utils/axios";

export class DatabaseService {
  async register({ firstName, lastName, mobile, password }) {
    try {
      const response = await axiosInstace
        .post("/api/v1/balak/register", {
          firstName,
          lastName,
          mobile,
          password,
        })
        .then((response) => response.data);
      if (response.data) {
        return this.login({ firstName, mobile, password });
      } else response.data;

    } catch (error) {
      console.error("Database Service :: register :: error", error);
      throw error;
    }
  }
  async login({ firstName, mobile, password }) {
    try {
      const response = await axiosInstace
        .post("/api/v1/balak/login",{firstName,mobile,password})
        .then((response) => response.data);
      return response.data;
    } catch (error) {
      console.error("Database Service :: login :: error", error);
      throw error;
    }
  }

  async getCurrentuser() {
    return axiosInstace
      .get("/api/v1/balak/getCurrentuser")
      .then((response) => response.data);
  }

  async addAchievement({ title, description, image }) {
    console.log("Image", image);

    const response = await axiosInstace.post("/api/v1/achievement", {
      title,
      description,
    });

    console.log(response.data);
  }
  async getAchivementById({ achievementId }) {
    console.log(achievementId);

    const response = await axiosInstace
      .get(`/api/v1/achievement/${achievementId}`)
      .then((response) => response.data);

    console.log("Achievement", response);

    return response.data;
  }
  async tryAPI() {
    const response = await axiosInstace.get("/api/v1/achievement");
    console.log(response.data);
  }
}
const databaseService = new DatabaseService();
export default databaseService;
