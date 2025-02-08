import axiosInstace from "../utils/axios";

export class DatabaseService {
  async addAchievement({ title, description, image }) {
    console.log("Image", image);

  
    const response = await axiosInstace.post("/api/v1/achievement", {title,description});

    console.log(response.data);
  }
  async tryAPI() {
    const response = await axiosInstace.get("/api/v1/achievement");
    console.log(response.data);
  }
}
const databaseService = new DatabaseService();
export default databaseService;
