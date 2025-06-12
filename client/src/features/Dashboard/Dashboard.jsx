import React, { useEffect, useState } from 'react';
import { getEntries, deleteEntry, editEntry } from 'api/entries';
import { CTA } from '@/components/CTA/CTA';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import Card from './components/Card';
import newEntryImg from './assets/images/new-entry.png';
import toast from 'react-hot-toast';
import './Dashboard.scss';

export default function Dashboard() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthContext();

  const handleGetEntries = async () => {
    try {
      const res = await getEntries();
      const sorted = res.data.sort((a, b) => {
        return new Date(b.entry_date) - new Date(a.entry_date);
      });
      setEntries(sorted);
    } catch (e) {
      console.error('Error fetching entries:', e);
      // If unauthorized, redirect to login
      // if (e.status === 401) {
      //   navigate('/login');
      //   return;
      // }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteEntry(id);
      if (res.status === 200) {
        toast.success(res.data.message);
        setLoading(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Failed to delete entry');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-entry?id=${id}&edit=true`);
  };

  useEffect(() => {
    // Wait for auth to finish loading before making decisions
    if (authLoading) {
      return;
    }

    // Only redirect if auth is done loading and user is definitely null
    if (!authLoading && !user) {
      console.log('User not authenticated, redirecting to login');

      // navigate('/login');
      return;
    }

    // If we have a user and we're still loading entries, fetch them
    if (user && loading) {
      handleGetEntries();
    }
  }, [loading, user, authLoading, navigate]);

  // Show loading while auth is loading or entries are loading
  if (authLoading || loading) {
    return (
      <main className='dashboard'>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  // If no user after auth loading is complete, don't render anything
  // (the useEffect will handle the redirect)
  if (!user) {
    return null;
  }

  return (
    <main className='dashboard'>
      {entries && entries.length ? (
        <section className='dashboard__entries'>
          <h2 className='dashboard__title'>Dashboard</h2>
          <div className='dashboard__entries-container'>
            {entries.map((entry) => {
              return (
                <Card
                  title={entry.title}
                  content={entry.content}
                  key={entry.id}
                  date={entry.entry_date}
                  onEdit={() => handleEdit(entry.id)}
                  onDelete={() => handleDelete(entry.id)}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <div className='dashboard__empty'>
          <div className='dashboard__empty-content'>
            <h2 className='dashboard__empty-title'>Create your first entry</h2>
            <p className='dashboard__empty-description'>
              This is where your thoughts, reflections, or even random ideas
              come to life. Just start a chat and we'll turn your words into
              something meaningful.
            </p>
            <CTA
              className='dashboard__empty-cta'
              text='Start chat'
              onClick={() => navigate('/chat')}
            >
              Start Chat
            </CTA>
          </div>
          <div className='dashboard__empty-image'>
            <img src={newEntryImg} alt='new entry' />
          </div>
        </div>
      )}
    </main>
  );
}
