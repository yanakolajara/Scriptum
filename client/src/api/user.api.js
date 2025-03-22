import { axiosInstance } from './axios.js';

export const register = async (data) => {
  try {
    const response = await axiosInstance.post('/users/register', data);
    return response;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response.data.message);
  }
};

export const verifyEmail = async (data) => {
  try {
    const response = await axiosInstance.post('/users/verify-email', data);
    return response;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response.data.message);
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post('/users/login', data);
    return response;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response.data.message);
  }
};

export const verify = async (data) => {
  try {
    const response = await axiosInstance.post('/users/verify', data);
    return response;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response.data.message);
  }
};

// Resends a new verification code to the user's email
export const resendCode = async (email) => {
  try {
    const response = await axiosInstance.post('/users/resend-code', { email });
    return response;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response.data.message);
  }
};
