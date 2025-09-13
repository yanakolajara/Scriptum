import React from 'react';
import { useAuthContext } from '@/app/providers/auth.provider';
import { useLogin } from '../hooks/useLogin';
import Form from '@/shared/components/Form/Form';
import Container from '@/shared/components/Container/Container';
import authImage from '@/assets/images/auth.png';
import '../styles/Login.scss';

export default function Login() {
  const {
    handleLogin,
    handleChange,
    isSubmitting,
    formData,
    showPassword,
    setShowPassword,
  } = useLogin();
  const { loading } = useAuthContext();

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
        <Form onSubmit={handleLogin}>
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
