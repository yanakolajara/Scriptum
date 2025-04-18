import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/auth.provider';

export default function NavAccount() {
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
    <section>
      <span>👤</span>
      <p>Yanako Lajara</p>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
}
