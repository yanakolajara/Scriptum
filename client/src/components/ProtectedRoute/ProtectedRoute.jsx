import { useAuthContext } from '@/providers/auth.provider';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return user ? <Outlet /> : <Navigate to='/login' replace />;
};
