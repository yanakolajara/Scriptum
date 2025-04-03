import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
// import { verifyEmail } from '../../api/user.api';

export default function VerifyEmail() {
  const { verifyEmail } = useAuthContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail({ token });
        if (res.status === 200) {
          navigate('/login');
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    verify();
  }, [token, navigate]);
  return <p>Loading...</p>;
}
