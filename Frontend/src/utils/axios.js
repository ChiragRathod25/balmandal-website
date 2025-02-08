import axios from "axios"
import config from "../conf/config"

const axiosInstace=axios.create({
    baseURL:config.baseUrl,
    withCredentials:true
})
export default axiosInstace