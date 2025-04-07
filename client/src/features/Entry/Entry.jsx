import { getEntries, getEntry } from 'api/entries';
import React from 'react';

export default function Entry() {
  const [entry, setEntry] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const query = new URLSearchParams(window.location.search);
  const entryId = query.get('id');

  const fetchEntry = async (entryId) => {
    try {
      const res = await getEntry(entryId);
      setEntry(res.data);
    } catch (error) {
      console.error('Error in entry:', error.message);
    }
  };
  React.useEffect(() => {
    fetchEntry(entryId);
  }, []);

  // fixme: entry not showing up with id

  if (!entry) return <h1>Loading...</h1>;
  console.log(entry);
  return (
    <div>
      <h1>{entry.title}</h1>
      <p>{entry.content}</p>
      <hr />
      <p>{entry.entry_date}</p>
      <button>edit</button>
      <button>delete</button>
    </div>
  );
}
