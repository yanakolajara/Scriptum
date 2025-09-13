import React, { useEffect, useState } from 'react';
import { useEntries } from '@/shared/hooks/useEntries';
import firstEntry from '@/assets/images/first-entry.png';
import Loader from '@/shared/components/Loader/Loader';
import EntryCard from '../components/Entry';
import Searchbar from '../components/Searchbar';
import Entries from '../components/Entries';
import Dashboard from './Dashboard';
import EmptyDashboard from './EmptyDashboard';
import '../styles/Home.scss';

export default function Home() {
  const { entries, loading, handleDelete, handleEdit } = useEntries();

  if (loading) {
    return <Loader />;
  }

  if (entries && entries.length) {
    return (
      <Dashboard>
        <h2 className='dashboard__title'>My Journal</h2>
        <Searchbar />
        <Entries
          entries={entries}
          renderEntryCard={(data) => (
            <EntryCard
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        />
      </Dashboard>
    );
  }

  return <EmptyDashboard firstEntryImg={firstEntry} />;
}
