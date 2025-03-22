import { useNavigate } from 'react-router-dom';
import { login } from '../../api/user.api';

export const useLogin = () => {
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    try {
      //TODO Validate data
      const res = await login(formData);
      console.log(res);
      const cookies = document.cookie.split(';');
      console.log('🚀 ~ handleLogin ~ cookies:', cookies);

      if (res.request.status === 200) {
        //TODO  Check if 2fa is required
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
