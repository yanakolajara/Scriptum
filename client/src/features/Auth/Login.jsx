import React, { useEffect, useState } from 'react';
import { useLogin } from './hooks/useLogin';
import { Form } from 'components/Form';
import { useAuthContext } from 'providers/auth.provider';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import Container from 'components/Container/Container';
import authImage from './assets/images/auth.png';

export default function Login() {
  const { handleLogin } = useLogin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [formData, user]);

  return (
    <main className='login'>
      <Container className='login__container'>
        <Form onSubmit={handleSubmit}>
          <Form.Title>Log in</Form.Title>
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

          <Form.Link to='/register'>
            Don&apos;t have an account? Sign up
          </Form.Link>
        </Form>
        <div className='carousel'>
          <img src={authImage} alt='login' />
        </div>
      </Container>
    </main>
  );
}
