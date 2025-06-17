import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const register = (data) =>
    axios
      .post('/users/register', data)
      .then((res) => res.data)
      .catch((error) => error.message);

  const login = (data) =>
    axios
      .post('/users/login', data)
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data.user);
        return res;
      })
      .catch((error) => {
        throw error;
      });

  const logout = async () => await axios.post('/users/logout');
  const verify = (data) =>
    axios
      .post('/users/verify', data)
      .then((res) => res.data)
      .catch((error) => error.message);

  const resendCode = (data) =>
    axios
      .post('/users/resend-code', data)
      .then((res) => res.data)
      .catch((error) => error.message);

  const verifyEmail = (data) =>
    axios
      .post('/users/verify-email', data)
      .then((res) => res.data)
      .catch((error) => error.message);

  const checkAuth = () =>
    axios
      .get('/users/check-auth')
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data.user);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        setUser(null);
      })
      .finally(() => setLoading(false));

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
