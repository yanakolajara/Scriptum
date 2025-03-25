import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const register = async (data) => {
    try {
      const response = await axiosInstance.post('/users/register', data);
      return response;
    } catch (error) {
      console.log(error.response);
      throw new Error(error.response.data.message);
    }
  };

  const verifyEmail = async (data) => {
    try {
      const response = await axiosInstance.post('/users/verify-email', data);
      return response;
    } catch (error) {
      console.log(error.response);
      throw new Error(error.response.data.message);
    }
  };

  const login = async (data) => {
    try {
      const response = await axiosInstance.post('/users/login', data);
      return response;
    } catch (error) {
      console.log(error.response);
      throw new Error(error.response.data.message);
    }
  };

  const verify = async (data) => {
    try {
      const response = await axiosInstance.post('/users/verify', data);
      return response;
    } catch (error) {
      console.log(error.response);
      throw new Error(error.response.data.message);
    }
  };

  // Resends a new verification code to the user's email
  const resendCode = async (email) => {
    try {
      const response = await axiosInstance.post('/users/resend-code', {
        email,
      });
      return response;
    } catch (error) {
      console.log(error.response);
      throw new Error(error.response.data.message);
    }
  };

  /**
   * Logs out the user by deleting the access_token from cookies.
   *
   */
  const logout = async () => {
    try {
      const response = await axiosInstance.post('/users/logout', {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/users/check-auth');

      setUser(response.data.user);
    } catch (error) {
      setError(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, [checkAuth, setLoading, loading]);

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    error,
    register,
    verifyEmail,
    login,
    verify,
    logout,
    resendCode,
  };
};
