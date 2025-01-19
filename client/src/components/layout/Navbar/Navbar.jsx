import React, { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sections from './Sections.jsx';
import './Navbar.scss';

export default function Navbar() {
  const [user, setUser] = useState('');
  return (
    <nav className='navbar'>
      <Header />
      <Sections />
      <Footer isAuthenticated={user} />
    </nav>
  );
}
