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
AxiosInstanceWithInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // clear invalid token
      alert("Invalid credintials");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);
