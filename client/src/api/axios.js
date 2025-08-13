import axios from 'axios';

// Set default credentials handling
axios.defaults.withCredentials = true;

// Create axios instance with proper configuration
const localURL = 'http://localhost:4000';
const apiUrl = import.meta.env.VITE_API_URL || localURL;
const isLocalDev =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

// Set up default axios configuration
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const axiosInstance = axios.create({
  baseURL: isLocalDev ? localURL : apiUrl,
  timeout: 30000, // Increased timeout for mobile networks
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with improved error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Axios error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      },
    });

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('accessToken');
          delete axiosInstance.defaults.headers.common['Authorization'];

          // Only redirect if not already on login page
          if (window.location.pathname !== '/login') {
            console.log('Unauthorized - redirecting to login');
            window.location.href = '/login';
          }
          break;

        case 403:
          console.log('Forbidden access');
          break;

        case 404:
          console.log('Resource not found');
          break;

        case 500:
          console.log('Server error');
          break;

        default:
          console.log('Unexpected error status:', status);
      }

      // Return a consistent error structure
      return Promise.reject({
        status,
        data: data || { message: 'An error occurred' },
        message: data?.message || `Request failed with status ${status}`,
      });
    } else if (error.request) {
      // Network error - no response received
      console.error('Network error - no response received');
      return Promise.reject({
        status: 0,
        data: { message: 'Network error - please check your connection' },
        message: 'Network error - please check your connection',
      });
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      return Promise.reject({
        status: 0,
        data: { message: 'Request failed to send' },
        message: 'Request failed to send',
      });
    }
  }
);

export default axiosInstance;
