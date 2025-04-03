import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';

export const useLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    //todo: Validate data
    try {
      const res = await login(formData);
      const cookies = document.cookie.split(';');

      if (res.request.status === 200) {
        //todo: Check if 2fa is required
        alert(res.data.message);
        navigate('/');
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleLogin };
};
