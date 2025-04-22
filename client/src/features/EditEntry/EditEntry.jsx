import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { editEntry, getEntry } from 'api/entries';
import { Form } from '@/components/Form/Form';
import toast from 'react-hot-toast';
import './EditEntry.scss';

export default function EditEntry() {
  const [entry, setEntry] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = () => new URLSearchParams(location.search);
  const entryId = getQueryParams().get('id');

  useEffect(() => {
    if (entryId) {
      fetchEntry(entryId);
    }
  }, [entryId]);

  const fetchEntry = async (id) => {
    try {
      const response = await getEntry(id);
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching entry:', error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await editEntry(entry);
      toast.success(response.message);
    } catch (error) {
      toast.success(response.message);
    } finally {
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  if (!entry) return <h1>Loading...</h1>;

  return (
    <Form onSubmit={handleEdit}>
      <Form.Input
        type='text'
        name='title'
        value={entry.title}
        onChange={handleChange}
        label='Title'
      />
      <Form.InputTextArea
        type='text'
        name='content'
        value={entry.content}
        onChange={handleChange}
        label='Content'
        required
      />
      <hr />
      {/* <Form.InputDateTime
        name='entry_date'
        value={entry.entry_date.slice(0, 16)}
        onChange={handleChange}
        label='Entry Date'
      /> */}
      <Form.Submit text='Save' />
    </Form>
  );
}
