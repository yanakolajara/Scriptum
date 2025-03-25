import React, { useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sections from './Sections.jsx';
import { useAuth } from '../../../providers/auth.provider.js';
import './Navbar.scss';

export default function Navbar() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  return (
    <nav className='navbar'>
      <Header />
      <Sections />
      <Footer />
    </nav>
  );
}
