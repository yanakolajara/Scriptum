import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
