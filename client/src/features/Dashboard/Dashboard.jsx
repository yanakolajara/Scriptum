import React, { useEffect, useState } from 'react';
import { getEntries, deleteEntry, editEntry } from 'api/entries';

export default function Dashboard() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = () => {
    console.log('edit');
  };

  useEffect(() => {
    if (loading) {
      handleGetEntries();
    }
  }, [loading]);

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
                  <p>{entry.entry_date}</p>
                  <section className='flex gap-2.5'>
                    <Button text='Edit' onClick={() => handleEdit()} />
                    <Button
                      text='Delete'
                      onClick={() => handleDelete(entry.id)}
                    />
                  </section>
                </section>
              </article>
            );
          })}
      </section>
    </main>
  );
}

const Button = ({ text, onClick }) => {
  return (
    <button
      className='border-1 rounded-md p-1.5 hover:bg-gray-200 cursor-pointer'
      onClick={onClick}
    >
      {text}
    </button>
  );
};
