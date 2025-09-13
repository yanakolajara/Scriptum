import axios from '@/shared/api/axios.js';
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function register(data) {
    try {
      const response = await axios.post('/users/register', data);
      console.log('🚀 ~ register ~ response:', response);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async function login(data) {
    try {
      const response = await axios.post('/auth/login', data);
      await checkAuth(); // <-- update context after login
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await axios.post('/auth/logout');
      await checkAuth(); // <-- update context after logout
    } catch (error) {
      throw error;
    }
  }

  async function verify() {
    try {
      const response = await axios.get('/auth/verify');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function resendCode(data) {
    try {
      const response = await axios.post('/auth/resend-code', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function verifyEmail({ token }) {
    try {
      const response = await axios.post('/users/verify-email', { token });
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
