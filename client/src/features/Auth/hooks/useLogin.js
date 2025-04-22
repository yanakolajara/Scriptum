import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    try {
      const res = await login(formData);

      if (res.status === 200) {
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
