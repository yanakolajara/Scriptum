import React, { useEffect, useState } from 'react';
import { getEntries, deleteEntry, editEntry } from 'api/entries';
import { Cta } from 'components/Cta';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';
import Card from 'components/Card/Card';
import newEntryImg from './assets/images/new-entry.png';
import './Dashboard.scss';

export default function Dashboard() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  // fixme: turn into protected route

  const handleGetEntries = async () => {
    try {
      const res = await getEntries();
      setEntries(res.data);
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

  //FIXME: dashboard should not be centered when there are a few entries

  return (
    <main className='dashboard'>
      {!!entries.length && (
        <h2 className='dashboard__title'>Dashboard</h2>
      )}
      <section className='dashboard__container'>
        {entries.length ? (
          entries.map((entry) => {
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
          })
        ) : (
          <div className='dashboard__empty'>
            <div className='dashboard__empty-content'>
              <h2 className='dashboard__empty-title'>
                Create your first entry
              </h2>
              <p className='dashboard__empty-description'>
                This is where your thoughts, reflections, or even random ideas
                come to life. Just start a chat and we'll turn your words into
                something meaningful.
              </p>
              <Cta
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
      </section>
    </main>
  );
}
