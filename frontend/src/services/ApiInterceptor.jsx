import axios from "axios";
const BASEURL = import.meta.env.VITE_API_URL;
export const AxiosInstance = axios.create({
  baseURL: BASEURL,
});

export const AxiosInstanceWithInterceptor = axios.create({
  baseURL: BASEURL,
});

AxiosInstanceWithInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    // Error-handling
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);
