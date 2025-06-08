import { createContext, useState, useEffect, useContext } from 'react';
import { axiosInstance } from '../api/axios';

// Improved token storage helper functions
const TOKEN_KEY = 'accessToken'; // Consistent key

const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete axiosInstance.defaults.headers.common['Authorization'];
};

// Improved cookie parsing with error handling
const getTokenFromCookies = () => {
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((c) =>
      c.trim().startsWith('access_token=')
    );

    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      return token;
    }
  } catch (error) {
    console.warn('Cookie parsing failed:', error);
  }
  return null;
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const trycatchHandler = async (func) => {
    try {
      setLoading(true);
      const response = await func();
      console.log('Auth response:', response);
      return response;
    } catch (error) {
      console.error('Auth error:', error);
      return (
        error.response || { status: 500, data: { message: 'Network error' } }
      );
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    return await trycatchHandler(() =>
      axiosInstance.post('/users/register', data)
    );
  };

  const login = async (data) => {
    return await trycatchHandler(async () => {
      const res = await axiosInstance.post('/users/login', data);

      if (res.status === 200 && res.data.user) {
        setUser(res.data.user);

        // Try to get token from response headers first
        let token = null;
        if (res.headers && res.headers.authorization) {
          token = res.headers.authorization.split(' ')[1];
        }

        // Fallback to cookies if no header token
        if (!token) {
          token = getTokenFromCookies();
        }

        // Store token if found
        if (token) {
          setToken(token);
        }
      }

      return res;
    });
  };

  const logout = async () => {
    return await trycatchHandler(async () => {
      const res = await axiosInstance.post('/users/logout');
      setUser(null);
      removeToken();
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

  const checkAuth = async () => {
    console.log('Checking authentication...');
    return await trycatchHandler(async () => {
      // First check if we have a stored token
      const storedToken = getToken();
      if (storedToken) {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${storedToken}`;
      }

      const res = await axiosInstance.get('/users/check-auth');

      if (res.status === 200 && res.data.user) {
        setUser(res.data.user);
      } else {
        // Clear invalid token
        removeToken();
        setUser(null);
      }

      return res;
    });
  };

  // Initialize auth check on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Check for existing token or cookie
      const existingToken = getToken() || getTokenFromCookies();

      if (existingToken) {
        setToken(existingToken);
        await checkAuth();
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

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
