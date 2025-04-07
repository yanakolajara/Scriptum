import axios from 'axios';
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 5000,
});
