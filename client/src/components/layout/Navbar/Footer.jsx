import React from 'react';
import FooterMenu from './FooterMenu';
import NavAccount from './NavAccount';
import { useNavigate } from 'react-router-dom';

export default function Footer({ isAuthenticated }) {
  const navigate = useNavigate();

  return (
    <footer className='navbar__footer cnt bg-secondary'>
      {/*//TODO Change to true */}
      {!isAuthenticated ? (
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
      ) : (
        <NavAccount />
      )}
    </footer>
  );
}
