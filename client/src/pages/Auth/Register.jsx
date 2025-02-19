import React, { useState } from 'react';
import { register } from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
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
    const userCreated = await register(formData);
    navigate('/');
  };
  return (
    <main>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor=''>
          First name
          <input
            value={formData.first_name}
            onChange={handleChange}
            type='text'
            name='first_name'
            required
          />
        </label>
        <label htmlFor=''>
          Middle name
          <input
            value={formData.middle_name}
            onChange={handleChange}
            type='text'
            name='middle_name'
          />
        </label>
        <label htmlFor=''>
          Last name
          <input
            value={formData.last_name}
            onChange={handleChange}
            type='text'
            name='last_name'
            required
          />
        </label>
        <label htmlFor=''>
          Email
          <input
            value={formData.email}
            onChange={handleChange}
            type='email'
            name='email'
            required
          />
        </label>
        <label htmlFor=''>
          Password
          <input
            value={formData.password}
            onChange={handleChange}
            type='password'
            name='password'
            required
          />
        </label>
        <input type='submit' value='Register' />
      </form>
    </main>
  );
}
