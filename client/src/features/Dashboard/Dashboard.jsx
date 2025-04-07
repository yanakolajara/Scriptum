import React, { useEffect, useState } from 'react';
import { getEntries } from 'api/entries';

export default function Dashboard() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);

  // fixme: turn into protected route

  const handleGetEntries = async () => {
    try {
      const res = await getEntries();
      setEntries(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  useEffect(() => {
    handleGetEntries();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <main>
      <h1>Dashboard</h1>
      {entries &&
        entries.map((entry) => {
          return (
            <div key={entry.id}>
              <h2>{entry.title}</h2>
              <p>{entry.content}</p>
            </div>
          );
        })}
    </main>
  );
}
