import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isDataValid } from '../utils/validators.utils';
import { useAuthContext } from '@/app/providers/auth.provider';
import toast from 'react-hot-toast';

export const useRegister = () => {
  const { register } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = isDataValid(formData);
    if (!success) {
      toast.error(message);
      return;
    }
    try {
      const res = await register(formData);
      console.log('🚀 ~ handleSubmit ~ res:', res);
      if (res.status !== 201) {
        toast.error(res.data.message);
      } else {
        toast(res.data.message, {
          icon: '📧',
        });
        navigate('/check-email');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    handleChange,
    handleSubmit,
    formData,
    showPassword,
    setShowPassword,
  };
};
