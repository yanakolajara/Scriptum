import React from 'react';
import { useAuth } from '../../providers/auth.provider';
import { useNavigate } from 'react-router-dom';

const tempStyle = {
  display: 'flex',
  flexDirection: 'row',
};

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
  }
  return (
    <main style={tempStyle}>
      <article>
        <h1>Home</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.{' '}
        </p>
        <section
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <a href='/register'>Create account</a>
          <a href='/login'>Log in</a>
        </section>
      </article>
      <article>
        <img src='' alt='hero' />
      </article>
    </main>
  );
}
