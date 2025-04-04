import React, { useEffect, useState } from 'react';
import { getEntries } from 'api/entries';

export default function Dashboard() {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGetEntries = async () => {
    try {
      const res = await getEntries();
      setEntries(res.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    handleGetEntries();
  }, []);

  //todo: fix loading state stuck when no user is logged in (CREATE PROTECTED ROUTE)

  if (loading) return <h1>Loading...</h1>;
  return (
    <main>
      <h1>Dashboard</h1>
      {entries && entries.map((entry) => <p key={entry.id}>{entry.title}</p>)}
    </main>
  );
}
