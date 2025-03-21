import { login } from '../../api/user.api';

export const useLogin = () => {
  const handleLogin = async (formData) => {
    try {
      const res = await login(formData);
      console.log(res);
      if (res.request.status === 200) {
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
