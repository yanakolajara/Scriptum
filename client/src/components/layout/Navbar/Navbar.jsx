import React, { use, useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sections from './Sections.jsx';
import './Navbar.scss';
import { useAuth } from '../../../providers/auth.provider.js';

export default function Navbar() {
  const [user, setUser] = useState(document.cookie.includes('access_token')); // todo: change this
  // useEffect(() => {}, []);
  return (
    <nav className='navbar'>
      <Header />
      <Sections />
      <Footer isAuthenticated={user} />
    </nav>
  );
}
