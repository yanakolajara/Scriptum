import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      console.log('Attempting login with:', { email: formData.email });
      const res = await login(formData);

      console.log('Login response:', res);

      if (res.status === 200) {
        toast.success(res.data.message);

        // Add a small delay to ensure user state is updated
        setTimeout(() => {
          console.log('Navigating to dashboard');
          navigate('/dashboard');
        }, 100);
      } else {
        console.log('Login failed:', res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
    }
  };

  return { handleLogin };
};
