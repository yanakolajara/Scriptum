import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    login(formData)
      // todo: fix
      .then((res) => {
        toast.success(res.data.message);
        navigate('/dashboard');
      })
      .catch((error) => {
        toast.error('Login failed');
      })
      .finally(() => setIsSubmitting(false));
  };

  return {
    handleChange,
    handleLogin,
    formData,
    isSubmitting,
    showPassword,
    setShowPassword,
  };
};
