import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '@/app/providers/auth.provider';
import toast from 'react-hot-toast';
import '../styles/VerifyEmail.scss';

export default function VerifyEmail() {
  const { verifyEmail } = useAuthContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail({ token });
        toast.success(response.data.message);
        navigate('/login');
      } catch (error) {
        toast.error(error.message);
      }
    };

    verify();
  }, []);

  return (
    <div className='verify-email'>
      <div className='verify-email__loader'></div>
      <span className='verify-email__text'>Verifying your email...</span>
    </div>
  );
}
