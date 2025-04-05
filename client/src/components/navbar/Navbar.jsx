import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/auth.provider.js';
import NavAccount from './NavAccount.jsx';
import './Navbar.scss';

export default function Navbar() {
  const { user, loading, error } = useAuthContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className='navbar'>
      <header className='navbar__header bg-secondary'>
        <h2 className='app-logo'>Scriptum</h2>
      </header>
      <article className='navbar__sections bg-primary'>
        <a href='/'>Home</a>
        <a href='/chat'>Chat</a>
      </article>
      <footer className='navbar__footer cnt bg-secondary'>
        {user ? (
          <section>
            <span>👤</span>
            <p>Yanako Lajara</p>
            <button onClick={handleLogout}>Logout</button>
          </section>
        ) : (
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
        )}
      </footer>
    </nav>
  );
}
