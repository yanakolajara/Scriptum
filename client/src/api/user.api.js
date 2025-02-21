import { axiosInstance } from './axios.js';

export const register = async (data) => {
  try {
    const response = await axiosInstance.post('/users/register', data);
    return response;
  } catch (error) {
    return error;
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.get('/users/login', data);
    return response;
  } catch (error) {
    return error;
  }
};

export const verify = async (data) => {
  try {
    const response = await axiosInstance.post('/users/verify', data);
    return response;
  } catch (error) {
    return error;
  }
};
