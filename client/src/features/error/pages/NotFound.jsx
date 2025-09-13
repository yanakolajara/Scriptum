import React from 'react';
import '../styles/NotFound.scss';

export default function NotFound() {
  return (
    <main className='not-found'>
      <div className='not-found__container'>
        <p className='not-found__error-code'>404</p>
        <h1 className='not-found__title'>Page not found</h1>
        <p className='not-found__message'>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className='not-found__actions'>
          <a href='/' className='not-found__home-link'>
            Go back home
          </a>
          <a href='/support' className='not-found__support-link'>
            Contact support <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
