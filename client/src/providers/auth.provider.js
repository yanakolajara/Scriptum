import { createContext, useState, useEffect, useContext } from 'react';
import { axiosInstance } from '../api/axios';

// Token storage helper functions
const setToken = (token) => {
  localStorage.setItem('access_token', token);
  // Update axios instance to include token in future requests
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const getToken = () => {
  return localStorage.getItem('access_token');
};

const removeToken = () => {
  localStorage.removeItem('access_token');
  delete axiosInstance.defaults.headers.common['Authorization'];
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const cookies = document.cookie.split(';');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const trycatchHandler = async (func) => {
    try {
      setLoading(true);
      const response = await func();
      console.log(response);
      return response;
    } catch (error) {
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    return await trycatchHandler(() => {
      const res = axiosInstance.post('/users/register', data);
      return res;
    });
  };

  const login = async (data) => {
    return await trycatchHandler(async () => {
      const res = await axiosInstance.post('/users/login', data);
      setUser(res.data.user);

      // Store token in localStorage as backup for cookie auth
      if (res.headers && res.headers.authorization) {
        const token = res.headers.authorization.split(' ')[1];
        localStorage.setItem('accessToken', token);
      }

      // Alternatively, we can extract token from cookies using javascript
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find((c) =>
        c.trim().startsWith('access_token=')
      );

      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        localStorage.setItem('accessToken', token);
        // Update axios instance
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
      }

      return res;
    });
  };

  const logout = async () => {
    return await trycatchHandler(async () => {
      const res = await axiosInstance.post('/users/logout');
      setUser(null);
      return res;
    });
  };

  const verify = async (data) => {
    return await trycatchHandler(async () => {
      return await axiosInstance.post('/users/verify', data);
    });
  };

  const resendCode = async (data) => {
    return await trycatchHandler(async () => {
      return await axiosInstance.post('/users/resend-code', data);
    });
  };

  const verifyEmail = async (data) => {
    return await trycatchHandler(async () => {
      return await axiosInstance.post('/users/verify-email', data);
    });
  };

  const checkAuth = async (access_token) => {
    return await trycatchHandler(async () => {
      const res = await axiosInstance.get('/users/check-auth');
      setUser(res.data.user);
    });
  };

  useEffect(() => {
    console.log('useEffect');
    const cookiesArr = document.cookie.split(';');

    const cookies = {};
    for (let c of cookiesArr) {
      const key = c.split('=')[0];
      const value = c.split('=')[1];
      cookies[key] = value;
    }
    if (cookies.access_token) {
      checkAuth(cookies.access_token);
    }
  }, []);

  useEffect(() => {}, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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
