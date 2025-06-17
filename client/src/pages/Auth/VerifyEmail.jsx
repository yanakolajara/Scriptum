import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import toast from 'react-hot-toast';
import './VerifyEmail.scss';

export default function VerifyEmail() {
  const { verifyEmail } = useAuthContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const verify = () =>
      verifyEmail({ token })
        .then((message) => toast.success(message))
        .then(() => navigate('/login'))
        .catch((err) => toast.error(err));

    verify();
  }, []);

  return (
    <div className='verify-email'>
      <div className='verify-email__loader'></div>
      <span className='verify-email__text'>Verifying your email...</span>
    </div>
  );
}
