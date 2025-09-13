import { useAuthContext } from '@/app/providers/auth.provider';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return user ? <Outlet /> : <Navigate to='/login' replace />;
}
