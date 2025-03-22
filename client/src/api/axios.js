import axios from 'axios';
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  timeout: 5000,
});
