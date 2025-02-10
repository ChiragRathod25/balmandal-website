import axiosInstace from "../utils/axios";
import { handleApiRequest } from "../utils/apiHelper";

//i only need  this when i want to play with user specific data, simply when i needed userId to get data 
// else i can use database.services.js to directly get or update data without userId and  
export class DatabaseAdminService{

}
const databaseAdminService = new DatabaseAdminService();
export default databaseAdminService;
