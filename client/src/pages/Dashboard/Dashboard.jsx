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
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const sortArrByKey = (arr, key) =>
    arr.sort((a, b) => {
      return new Date(b[key]) - new Date(a[key]);
    });

  const handleGetEntries = () =>
    getEntries()
      .then((res) => {
        const sorted = sortArrByKey(res.data, 'entry_date');
        setEntries(sorted);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));

  const handleDelete = (id) =>
    deleteEntry(id)
      .then((res) => toast.success(res.message))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(true));

  const handleEdit = (id) => navigate(`/edit-entry?id=${id}&edit=true`);

  useEffect(() => {
    if (loading) {
      handleGetEntries();
    }
  }, [loading, navigate, handleDelete]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  if (loading) {
    return (
      <main className='dashboard'>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Loading...</h1>
        </div>
      </main>
    );
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
