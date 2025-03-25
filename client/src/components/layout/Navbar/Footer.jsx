import React, { useEffect } from 'react';
import FooterMenu from './FooterMenu';
import NavAccount from './NavAccount';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/auth.provider';

export default function Footer({}) {
  const navigate = useNavigate();
  const { user, loading, error } = useAuth();

  useEffect(() => {}, [user, loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <footer className='navbar__footer cnt bg-secondary'>
        <NavAccount />
      </footer>
    );
  } else {
    return (
      <footer className='navbar__footer cnt bg-secondary'>
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
      </footer>
    );
  }
}
