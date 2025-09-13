import React from 'react';
import '../styles/Entries.scss';

export default function Entries({ entries, renderEntryCard }) {
  return (
    <div className='entries'>
      {entries.map((entry) => renderEntryCard(entry))}
    </div>
  );
}
