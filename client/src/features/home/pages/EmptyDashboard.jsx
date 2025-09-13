import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/shared/components/CTA/CTA';

export default function EmptyDashboard({ firstEntryImg }) {
  const navigate = useNavigate();
  return (
    <div className='dashboard__empty'>
      <div className='dashboard__empty-content'>
        <h2 className='dashboard__empty-title'>Create your first entry</h2>
        <p className='dashboard__empty-description'>
          This is where your thoughts, reflections, or even random ideas come to
          life. Just start a chat and we'll turn your words into something
          meaningful.
        </p>
        <Button
          className='dashboard__empty-cta'
          text='Start chat'
          onClick={() => navigate('/chat')}
        >
          Start Chat
        </Button>
      </div>
      <div className='dashboard__empty-image'>
        <img src={firstEntryImg} alt='new entry' />
      </div>
    </div>
  );
}
