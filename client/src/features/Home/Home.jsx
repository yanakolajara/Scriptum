import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/auth.provider';
import { Cta } from 'components/Cta';

const tempStyle = {
  display: 'flex',
  flexDirection: 'row',
};

export default function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  });
  return (
    <main style={tempStyle}>
      <article>
        <h1>Welcome to Scriptum: Your AI-Powered Journal</h1>
        <section
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Cta onClick={() => navigate('/register')}> Create account</Cta>
          <Cta onClick={() => navigate('/login')}>Log in</Cta>
        </section>
      </article>
      <article>{/* <img src='' alt='hero' /> */}</article>
    </main>
  );
}
