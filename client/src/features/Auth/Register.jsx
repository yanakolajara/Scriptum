import React, { useEffect, useState } from 'react';
import { useRegister } from './hooks/useRegister';

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

  const lowercase = /[a-z]/;
  const uppercase = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  //todo: display validation error as list
  //todo: display validation error as container under submit button
  //todo: display validation error dynamically (only proper fields missing)
  //todo: password validation specific types of special characters

  useEffect(() => {}, [passwordFocus, passwordBlur, formData.password]);

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
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordBlur(true)}
            type={showPassword ? 'text' : 'password'}
            name='password'
            required
          />
          <input
            type='checkbox'
            onChange={() => setShowPassword(!showPassword)}
            checked={showPassword}
          />
        </label>

        {passwordFocus && passwordBlur && (
          <>
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
            {formData.password.length > 0 && formData.password.length < 8 && (
              <p style={{ color: 'red' }}>
                Password must be at least 8 characters long
              </p>
            )}
          </>
        )}
        {/* <label htmlFor=''>
          Confirm password
          <input
            value={formData.passwordConfirm}
            onChange={handleChange}
            type='password'
            name='password'
            required
          />
        </label> */}
        <input type='submit' value='Register' />
      </form>
    </main>
  );
}
