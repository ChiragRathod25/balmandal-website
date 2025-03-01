import axios from 'axios';
import config from '../conf/config';
import databaseService from "../services/database.services"

const axiosInstace = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

axiosInstace.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Token expired, refreshing...');
      try {
        await databaseService.refreshAccessToken();
        return axiosInstace(error.config); // Retry failed request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstace;
