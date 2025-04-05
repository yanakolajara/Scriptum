import { createContext, useState, useEffect, useContext } from 'react';
import { axiosInstance } from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const trycatchHandler = async (func) => {
    try {
      setLoading(true);
      setError(null);
      const response = await func();
      setLoading(false);
      return response;
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      return error.response;
    }
  };

  const register = async (data) => {
    return await trycatchHandler(() =>
      axiosInstance.post('/users/register', data)
    );
  };

  const login = async (data) => {
    return await trycatchHandler(() =>
      axiosInstance.post('/users/login', data)
    );
  };

  const logout = async () => {
    return await trycatchHandler(() => axiosInstance.post('/users/logout'));
  };

  const verify = async (data) => {
    return await trycatchHandler(() =>
      axiosInstance.post('/users/verify', data)
    );
  };

  const resendCode = async (data) => {
    return await trycatchHandler(() =>
      axiosInstance.post('/users/resend-code', data)
    );
  };

  const verifyEmail = async (data) => {
    return await trycatchHandler(() =>
      axiosInstance.post('/users/verify-email', data)
    );
  };

  const checkAuth = async () => {
    return await trycatchHandler(() => axiosInstance.get('/users/check-auth'));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await checkAuth();
      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    };
    console.log('after fetch');
    fetchUser();
  }, []);

  // todo: rerender only when required (components should not keep re-rendering on every change of url or state)

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        verify,
        resendCode,
        verifyEmail,
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
