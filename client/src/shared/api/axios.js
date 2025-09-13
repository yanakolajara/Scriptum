import axios from 'axios';

// Set default credentials handling

// Create axios instance with proper configuration
const isLocalDev = import.meta.env.ENV === 'development';
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Set up default axios configuration
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.timeout = 30000;
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Request interceptor error:', error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
