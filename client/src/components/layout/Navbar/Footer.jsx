import React from 'react';
import FooterMenu from './FooterMenu';
import NavAccount from './NavAccount';

export default function Footer({ isAuthenticated }) {
  return (
    <footer className='navbar__footer cnt bg-secondary'>
      {/*//TODO Change to true */}
      {!isAuthenticated ? (
        <article className='navbar__footer__guest'>
          <button className='bg-success'>Log in</button>
          <button className='bg-secondary btn-signup'>Sign up</button>
        </article>
      ) : (
        <NavAccount />
      )}
    </footer>
  );
}
