import axios from 'axios';

// Set default credentials handling
axios.defaults.withCredentials = true;

// Create axios instance with proper configuration
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const isLocalDev = window.location.hostname === 'localhost';

console.log('API URL:', apiUrl); // Debug log for troubleshooting
console.log('Is local development:', isLocalDev);

// Set up default axios configuration
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const axiosInstance = axios.create({
  baseURL:
    isLocalDev && !import.meta.env.PROD ? 'http://localhost:8080' : apiUrl,
  timeout: 15000, // Increased timeout for potentially slow connections
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Only send credentials if not in development mode
  withCredentials: true,
});

// Debug middleware
axiosInstance.interceptors.request.use((request) => {
  console.log('Starting Request:', request.method, request.url);
  return request;
});

// Add request interceptor for handling common request tasks
axiosInstance.interceptors.request.use(
  (config) => {
    // You could add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling common responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors like 401, 403, etc.
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        'Response error:',
        error.response.status,
        error.response.data
      );

      // Handle specific error codes
      if (error.response.status === 401) {
        // Handle unauthorized
        console.log('User is unauthorized');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
