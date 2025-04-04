import { getEntries } from 'api/entries';
import React from 'react';

export default function Entry() {
  const [entry, setEntry] = React.useState(null);
  // get url queries
  const query = new URLSearchParams(window.location.search);
  const id = query.get('id');

  const fetchEntry = async (id) => {
    try {
      const res = await getEntries(id);
      setEntry(res.data);
    } catch (error) {
      console.error('Error in entry:', error.message);
    }
  };
  React.useEffect(() => {
    fetchEntry(id);
  }, []);

  if (!entry) return <h1>Loading...</h1>;
  //todo: fetch entry by id
  return (
    <div>
      <h1>ENTRIES</h1>
      <p>{entry.content}</p>
    </div>
  );
}
