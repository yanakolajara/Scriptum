import React, { useEffect, useState } from 'react';
import { getEntries, deleteEntry, editEntry } from 'api/entries';
import { Cta } from 'components/Cta';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider';

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
  return (
    <main>
      <h1 className='text-2xl'>Dashboard</h1>
      <section className='flex flex-col gap-2.5'>
        {entries &&
          entries.map((entry) => {
            return (
              <article className='border-1 rounded-md' key={entry.id}>
                <section className='p-2.5'>
                  <h2 className='text-xl'>{entry.title}</h2>
                  <p className='text-sm'>{entry.content}</p>
                </section>
                <hr />
                <section className='flex justify-evenly p-2.5'>
                  <p>{entry.entry_date.slice(0, 16).split('T').join(' ')}</p>
                  <section className='flex gap-2.5'>
                    <Cta text='Edit' onClick={() => handleEdit(entry.id)} />
                    <Cta text='Delete' onClick={() => handleDelete(entry.id)} />
                  </section>
                </section>
              </article>
            );
          })}
      </section>
    </main>
  );
}
