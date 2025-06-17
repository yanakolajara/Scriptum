import axios from './axios';

const getEntries = () =>
  axios
    .get('/entries')
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
const getEntry = (id) =>
  axios
    .get(`/entries/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log('err');
      throw err;
    });
const createEntry = (data) =>
  axios
    .post('/entries', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
const editEntry = (data) =>
  axios
    .put(`/entries/${data.id}`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
const deleteEntry = (id) =>
  axios
    .delete(`/entries/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export { getEntries, getEntry, createEntry, editEntry, deleteEntry };
