import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    //todo: Validate data
    try {
      const res = await login(formData);
      const cookies = document.cookie.split(';');

      if (res.status === 200) {
        //todo: Check if 2fa is required
        toast.success(res.data.message);
        navigate('/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleLogin };
};
