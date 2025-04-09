import React, { useEffect, useState } from 'react';
import { useLogin } from './hooks/useLogin';
import { Form } from 'components/Form';

export default function Login() {
  const { handleLogin } = useLogin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    handleLogin(formData);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <main>
      <h1>Log in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.InputText
          // type='email'
          name='email'
          label='Email'
          value={formData.email}
          onChange={handleChange}
          // required
        />
        <Form.InputText
          type='password'
          name='password'
          label='Password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor=''>
          Password
          <input
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            name='password'
          />
        </label>
        <label htmlFor=''>
          Show password
          <input
            type='checkbox'
            onChange={() => setShowPassword(!showPassword)}
          />
        </label>
        <input type='submit' value='Log in' />
      </Form>
    </main>
  );
}
