import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/user.api';
import { isDataValid, isPasswordValid } from './utils/validators.utils';
import { storeDataInLS } from '../../utils/window.utils';

export const useRegister = () => {
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
      alert(message);
      return;
    }
    try {
      const res = await register(formData);
      console.log(res);
      if (res.request.status === 201) {
        storeDataInLS('userId', res.data.id);
        alert(res.data.message);
        navigate('/');
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleChange, handleSubmit, formData };
};
