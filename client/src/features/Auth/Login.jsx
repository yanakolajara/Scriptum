import React, { useState } from 'react';
import { useLogin } from './hooks/useLogin';

export default function Login() {
  const { handleLogin } = useLogin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };
  return (
    <main>
      <h1>Log in</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor=''>
          Email
          <input
            value={formData.email}
            onChange={handleChange}
            type='email'
            name='email'
          />
        </label>
        <label htmlFor=''>
          Password
          <input
            value={formData.password}
            onChange={handleChange}
            type='password'
            name='password'
          />
        </label>
        <input type='submit' value='Log in' />
      </form>
    </main>
  );
}
