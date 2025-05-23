import React, { useEffect, useState } from 'react';
import { getEntries, deleteEntry, editEntry } from 'api/entries';
import { CTA } from '@/components/CTA/CTA';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import Card from './components/Card';
import newEntryImg from './assets/images/new-entry.png';
import './Dashboard.scss';

export default function Dashboard() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleGetEntries = async () => {
    try {
      const res = await getEntries();
      const sorted = res.data.sort((a, b) => {
        return new Date(b.entry_date) - new Date(a.entry_date);
      });
      setEntries(sorted);
    } catch (e) {
      console.error(e);
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
    } catch (error) {}
  };

  const handleEdit = (id) => {
    navigate(`/edit-entry?id=${id}&edit=true`);
  };
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if (loading) {
      handleGetEntries();
    }
  }, [loading, user]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <main className='dashboard'>
      {entries.length ? (
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
            />
          </div>
          <div className='dashboard__empty-image'>
            <img src={newEntryImg} alt='new entry' />
          </div>
        </div>
      )}
    </main>
  );
}
