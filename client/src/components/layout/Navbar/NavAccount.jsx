import React from 'react';
import { logout } from '../../../api/user.api';
import { useNavigate } from 'react-router-dom';

export default function NavAccount() {
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
    <section>
      <span>👤</span>
      <p>Yanako Lajara</p>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
}
