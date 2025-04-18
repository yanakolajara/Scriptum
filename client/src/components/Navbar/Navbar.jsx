import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider.js';
import NavAccount from './NavAccount.jsx';
import { Cta } from 'components/Cta/index.jsx';
import { GrChat, GrHomeRounded, GrLogout } from 'react-icons/gr';

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
        <div onClick={() => navigate('/')} className='navbar__menu-item'>
          <GrHomeRounded />
          <div>Home</div>
        </div>
        <button onClick={() => navigate('/chat')} className='navbar__menu-item'>
          <GrChat />

          <div>Chat</div>
        </button>
        <div className='navbar__divider' />
        {/* <button
          onClick={() => navigate('')}
          className='flex items-center gap-[10px] py-[18px] px-[40px] text-[var(--text-white)] text-base cursor-pointer'
        >
          <i className='' />
          <div>Settings</div>
        </button> */}
        <button onClick={handleLogout} className='navbar__menu-item'>
          <GrLogout />
          <div>Log out</div>
        </button>
      </div>
      <div className='user-profile'>
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg id="514:4145" layer-name="User" width="231" height="58" viewBox="0 0 231 58" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="user-avatar" style="width: 100%; height: 58px"> <rect width="231" height="58" rx="29" fill="white" fill-opacity="0.15"></rect> <circle cx="29" cy="29" r="25" fill="url(#pattern0_514_4145)"></circle> <text fill="#DFE4EA" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="18" font-weight="bold" letter-spacing="0px"><tspan x="82.6855" y="35.5455">Devid Wilium</tspan></text> </svg>`,
          }}
        />
      </div>
    </div>
  );
}
