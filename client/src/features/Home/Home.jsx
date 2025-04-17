import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/auth.provider';
import { Cta } from 'components/Cta';
import Button from 'components/Button/Button';
import heroImage from '../../assets/images/hero-image.png';
import './Home.scss';

export default function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  return (
    <>
      <main className='hero'>
        <div className='hero-content'>
          <h1 className='hero-title'>Welcome to scriptum</h1>
          <p className='hero-description'>
            Scriptum is a journaling application designed to help you remember,
            reflect, and write about your day in a simple and meaningful way.
            Through natural conversations with an intelligent assistant, you can
            share how your day went while the AI guides you with thoughtful
            questions to uncover what truly mattered.
          </p>
          <div className='hero-buttons'>
            <Button onClick={() => navigate('/login')}>Get Started</Button>
            {/* <Button variant='secondary'>
              <svg
                className='download-icon'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 4 18.549 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.549 20 18 20H6Z'
                  fill='currentColor'
                />
              </svg>
              Download App
            </Button> */}
          </div>
        </div>
        <div className='hero-image'>
          <img src={heroImage} alt='Notebook illustration' />
        </div>
      </main>
    </>
  );
}
