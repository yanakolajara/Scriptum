import React, { useEffect, useState } from 'react';
import { useLogin } from './hooks/useLogin';
import { Form } from '@/components/Form/Form';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await handleLogin(formData);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fixed useEffect - remove formData dependency to prevent infinite re-renders
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading state
  if (loading) {
    return (
      <main className='login'>
        <Container className='login__container'>
          <div>Loading...</div>
        </Container>
      </main>
    );
  }

  return (
    <main className='login'>
      <Container className='login__container'>
        <Form onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <Form.Input
            type='email'
            name='email'
            label='Email'
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <Form.Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            label='Password'
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <Form.InputCheckbox
            type='checkbox'
            name='showPassword'
            label='Show password'
            value={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            disabled={isSubmitting}
          />
          <Form.Submit
            type='submit'
            text={isSubmitting ? 'Logging in...' : 'Log in'}
            disabled={isSubmitting}
          />
          <p>
            Don&apos;t have an account?
            <a href='/register'>Sign up</a>
          </p>
        </Form>
        <div className='carousel'>
          <img src={authImage} alt='login' />
        </div>
      </Container>
    </main>
  );
}
