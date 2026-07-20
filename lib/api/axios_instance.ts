import axios from "axios";
import { getTokenCookie } from "../cookies";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8089";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//       console.log("====== REQUEST ======");
//       // console.log("URL:", config.baseURL + config.url);
//       console.log("Headers:", config.headers);
//       console.log("Data:", config.data);

//     // Don't set Content-Type for FormData - let axios set it automatically with boundary
//     if (config.data instanceof FormData) {
//       delete config.headers['Content-Type'];
//     }

//     const token = await getTokenCookie();
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("========== REQUEST ==========");

    const token = await getTokenCookie();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    console.log("URL:", (config.baseURL || "") + (config.url || ""));
    console.log("Authorization:", config.headers.Authorization);
    console.log("Headers:", config.headers);

    return config;
  },
  (error) => Promise.reject(error),
);


export default axiosInstance;
