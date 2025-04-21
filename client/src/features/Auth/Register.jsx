import React, { useEffect, useState } from 'react';
import { useRegister } from './hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import { Form } from 'components/Form';
import Container from 'components/Container/Container';
import authImage from './assets/images/auth.png';
import './Register.scss'; // Re-using register styles

export default function Register() {
  const {
    formData,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  } = useRegister();

  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const lowercase = /[a-z]/;
  const uppercase = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  //todo: password validation specific types of special characters
  //fixme: match special characters with backend

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [passwordFocus, passwordBlur, formData.password, user]);

  return (
    <main className='register'>
      <Container className='register__container'>
        <Form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className='register__name'>
            <Form.Input
              type='text'
              name='first_name'
              label='First name'
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <Form.Input
              type='text'
              name='middle_name'
              label='Middle name'
              value={formData.middle_name}
              onChange={handleChange}
            />
            <Form.Input
              type='text'
              name='last_name'
              label='Last name'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <Form.Input
            type='email'
            name='email'
            label='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            label='Password'
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordBlur(true)}
            required
          />

          <label htmlFor=''>
            Show password
            <input
              type='checkbox'
              onChange={() => setShowPassword(!showPassword)}
              checked={showPassword}
            />
          </label>

          {passwordFocus && passwordBlur && (
            <div className='password-validation'>
              {formData.password.length < 8 && (
                <p style={{ color: 'red' }}>
                  Password must be at least 8 characters long
                </p>
              )}
              {!lowercase.test(formData.password) && (
                <p style={{ color: 'red' }}>
                  Password must contain at least one lowercase letter
                </p>
              )}
              {!uppercase.test(formData.password) && (
                <p style={{ color: 'red' }}>
                  Password must contain at least one uppercase letter
                </p>
              )}
              {!number.test(formData.password) && (
                <p style={{ color: 'red' }}>
                  Password must contain at least one number
                </p>
              )}
              {!specialChar.test(formData.password) && (
                <p style={{ color: 'red' }}>
                  Password must contain at least one special character
                </p>
              )}
            </div>
          )}

          <Form.Submit text='Register' />
          <p>
            Already have an account?
            <a href='/login'>Log In</a>
          </p>
        </Form>
        <div className='carousel'>
          <img src={authImage} alt='register' />
        </div>
      </Container>
    </main>
  );
}
