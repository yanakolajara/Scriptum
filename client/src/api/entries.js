import axios from './axios';

export const getEntries = async () => {
  try {
    const response = await axios.get('/entries');
    return response.data;
  } catch {
    console.log(error);
  }
};

export const getEntry = async (id) => {
  try {
    const response = await axios.get(`/entries/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createEntry = async (data) => {
  try {
    const response = await axios.post('/entries', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editEntry = async (data) => {
  try {
    const response = await axios.put(`/entries/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEntry = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`/entries/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
