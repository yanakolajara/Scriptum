import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider.js';
import NavAccount from './NavAccount.jsx';
import { Cta } from 'components/Cta/index.jsx';
// import './Navbar.scss';

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
    <nav className='flex flex-col rounded-[15px] shadow-[0_4px_4px_rgba(0,0,0,0.41)] bg-(--color-primary)'>
      <header className='navbar__header rounded-t-[15px] h-[75px]  bg-(--color-secondary)'>
        <h2 className='text-[34px] text-white text-center flex items-center justify-center h-[75px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
          Scriptum
        </h2>
      </header>
      <article className='flex flex-col items-center py-10 flex-grow bg-primary'>
        <a
          href='/'
          className='w-4/5 py-2.5 mb-2.5 rounded-[20px] text-2xl font-bold text-center no-underline text-[#eae7ff] transition-all duration-200 hover:bg-[rgba(134,121,252,0.5)] hover:cursor-pointer'
        >
          Home
        </a>
        <a
          href='/chat'
          className='w-4/5 py-2.5 mb-2.5 rounded-[20px] text-2xl font-bold text-center no-underline text-[#eae7ff] transition-all duration-200 hover:bg-[rgba(134,121,252,0.5)] hover:cursor-pointer'
        >
          Chat
        </a>
      </article>
      <footer className='flex flex-col bg-(--color-secondary) shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-b-[15px] bg-secondary'>
        {user ? (
          <section className='flex items-center gap-2 p-4'>
            <span>👤</span>
            <p className='m-0'>Yanako Lajara</p>
            <Cta text='Logout' onClick={handleLogout} />
          </section>
        ) : (
          <article className='flex justify-evenly items-center p-4'>
            <Cta text='Login' onClick={() => navigate('/login')} />
            <Cta text='Register' onClick={() => navigate('/register')} />
          </article>
        )}
      </footer>
    </nav>
  );
}
