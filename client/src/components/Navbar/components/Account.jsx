import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../providers/auth.provider';

export default function Account() {
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
    <section className='nav-account'>
      <span className='nav-account__avatar'>👤</span>
      <p className='nav-account__name'>Yanako Lajara</p>
      <button className='nav-account__logout' onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}
