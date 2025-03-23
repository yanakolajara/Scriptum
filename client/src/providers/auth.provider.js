import { createContext, useState, useEffect, useContext } from 'react';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(document.cookie.includes('access_token'));
  const [loading, setLoading] = useState(true);

  const isUserLoggedIn = () => {
    console.log('Checking if user is logged in');
    return document.cookie.includes('access_token');
  };

  useEffect(() => {
    // const checkAuth = async () => {
    //   try {
    //     const res = await axios.get('/api/auth/me', { withCredentials: true });
    //     setUser(res.data.user);
    //   } catch (err) {
    //     setUser(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // checkAuth();
    console.log('Auth provider');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isUserLoggedIn, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext();
};
