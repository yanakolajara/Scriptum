import React, { useEffect, useState } from 'react';
import { useRegister } from './useRegister';

export default function Register() {
  const { handleChange, handleSubmit, formData } = useRegister();

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
