import axios from "axios";
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'X-Custom-Header': 'foobar' }
});
export default axiosInstance;