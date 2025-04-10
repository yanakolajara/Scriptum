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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };

  useEffect(() => {}, [formData]);

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
          // todo: add show/hide password on Form component
          type={showPassword ? 'text' : 'password'}
          name='password'
          label='Password'
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor=''>
          Show password
          <input
            type='checkbox'
            onChange={() => setShowPassword(!showPassword)}
          />
        </label>

        <Form.Submit text='Log in' />
      </Form>
    </main>
  );
}
