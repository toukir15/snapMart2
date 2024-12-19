import axios from "axios";
import { cookies } from "next/headers";

// Create the Axios instance
const axiosInstance = axios.create({
  // baseURL: `${envConfig.baseApi}`,
  // baseURL: `https://snapmartserver.vercel.app/api/v1`,
  baseURL: `http://localhost:5000/api/v1`,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (config.headers) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


export default axiosInstance;
