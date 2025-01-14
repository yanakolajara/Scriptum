import React, { useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState('temp');
  return (
    <nav className='navbar'>
      <header></header>
      <article>
        <a href='/'>Home</a>
      </article>
      <footer>
        {user ? (
          <>
            <button>Account</button>
            <button>Settings</button>
            <button>LogOut</button>
            <button>Back</button>
          </>
        ) : (
          <button>LogIn</button>
        )}
      </footer>
    </nav>
  );
}
