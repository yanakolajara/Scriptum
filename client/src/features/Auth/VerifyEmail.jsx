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

  //todo: design a nice email verification page
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail({ token });
        console.log(res);
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate('/login');
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="verify-email">
      <div className="verify-email__loader"></div>
      <span className="verify-email__text">Verifying your email...</span>
    </div>
  );
}
