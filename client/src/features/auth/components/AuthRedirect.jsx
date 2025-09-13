import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/app/providers/auth.provider';
import { getRedirectPath } from '../utils/redirectLogic';

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    navigate(getRedirectPath(user));
  }, [user, navigate]);

  return null;
};
