import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.USER_CONTEXT_SERVICE_API || 'http://localhost:8083',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
