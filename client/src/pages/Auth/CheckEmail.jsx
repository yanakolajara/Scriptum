import React from 'react';

export default function CheckEmail() {
  return (
    <div>
      <h1>Check your email</h1>
      <p>
        We have sent you an email with a link to verify your account. Please
        check your inbox and click on the link to continue.
      </p>
      <a href='/login'>Login</a>
    </div>
  );
}
