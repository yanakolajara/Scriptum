import React from 'react';
import './CheckEmail.scss';

export default function CheckEmail() {
  return (
    <div className="check-email">
      <h1 className="check-email__title">Check your email</h1>
      <p className="check-email__message">
        We have sent you an email with a link to verify your account. Please
        check your inbox and click on the link to continue.
      </p>
      <a href='/login' className="check-email__login-link">Login</a>
    </div>
  );
}
