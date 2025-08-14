import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  async function register(data) {
    try {
      const response = await axios.post('/users/register', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function login(data) {
    try {
      const response = await axios.post('/auth/login', data);
      setIsAuthenticated(true);
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await axios.post('/users/logout');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      throw error;
    }
  }

  async function verify() {
    try {
      const response = await axios.get('/users/verify');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function resendCode(data) {
    try {
      const response = await axios.post('/users/resend-code', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function verifyEmail() {
    try {
      const response = await axios.get('/users/verify-email');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function checkAuth() {
    try {
      const response = await axios.get('/auth/check');
      setUser(response.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return response;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        isAuthenticated,
        register,
        login,
        logout,
        verify,
        resendCode,
        verifyEmail,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };
