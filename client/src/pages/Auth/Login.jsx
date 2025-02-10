import React, { useState } from 'react';

export default function Login() {
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
    console.log(formData);
  };
  return (
    <main>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', 'flex-direction': 'column' }}
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
