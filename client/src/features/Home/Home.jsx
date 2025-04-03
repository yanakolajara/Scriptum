import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/auth.provider';

const tempStyle = {
  display: 'flex',
  flexDirection: 'row',
};

export default function Home() {
  const { user } = useAuthContext();
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
