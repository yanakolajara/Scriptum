import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/providers/auth.provider';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  console.log('isAutenticated: ', isAuthenticated);
  const location = useLocation();

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-xl'>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
