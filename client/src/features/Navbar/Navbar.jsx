import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider.js';
import { CTA } from '@/components/CTA/CTA.jsx';
import { GrChat, GrHomeRounded, GrLogout } from 'react-icons/gr';
import { HiUser } from 'react-icons/hi2';
import Account from './components/Account.jsx';
import './Navbar.scss';

export default function Navbar() {
  const { user, logout } = useAuthContext();
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

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  // align-self: stretch;
  return (
    <div className='navbar'>
      <div className='navbar__logo-container'>
        <div className='navbar__logo-text'>Scriptum</div>
      </div>
      <div className='navbar__menu'>
        <CTA
          variant='base-ghost'
          size='large'
          onClick={() => navigate('/')}
          icon={<GrHomeRounded />}
          iconPosition='left'
        >
          Home
        </CTA>

        {user && (
          <CTA
            variant='base-ghost'
            size='large'
            onClick={() => navigate('/chat')}
            icon={<GrChat />}
          >
            Chat
          </CTA>
        )}
        <div className='navbar__divider' />
        {/* <button
          onClick={() => navigate('')}
          className='flex items-center gap-[10px] py-[18px] px-[40px] text-[var(--text-white)] text-base cursor-pointer'
        >
          <i className='' />
          <div>Settings</div>
        </button> */}
        {user && (
          <CTA
            variant='base-ghost'
            size='large'
            icon={<GrLogout />}
            onClick={handleLogout}
          >
            Log out
          </CTA>
        )}
        {!user && (
          <CTA
            variant='base-ghost'
            size='large'
            icon={<GrLogout />}
            onClick={() => navigate('/login')}
          >
            Log In
          </CTA>
        )}
      </div>

      {user && (
        <div className='profile'>
          {/* <img src='' alt='profile-image' /> */}
          <HiUser className='profile__avatar' fill='#fff' />
          <p className='profile__name'>
            {user.first_name} {user.last_name}
          </p>
        </div>
      )}
    </div>
  );
}
