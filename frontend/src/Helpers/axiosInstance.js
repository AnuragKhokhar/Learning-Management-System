import axios from "axios";

const BASE_URL = "https://web-2yd20ah8hloe.up-sg-sin1-1.apps.prod.run-on-seenode.com/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
