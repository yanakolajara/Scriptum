import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteEntry, getEntries } from '@/shared/api/entries';
import { useAuthContext } from '@/app/providers/auth.provider';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function useEntries() {
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
  return { entries, loading, handleDelete, handleEdit };
}
