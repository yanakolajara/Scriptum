import React from 'react';

export default function NavbarMenuNewUser() {
  return (
    <article className='navbar__footer__guest'>
      <button className='bg-success' onClick={() => navigate('/login')}>
        Log in
      </button>
      <button
        className='bg-secondary btn-signup'
        onClick={() => navigate('/register')}
      >
        Register
      </button>
    </article>
  );
}
