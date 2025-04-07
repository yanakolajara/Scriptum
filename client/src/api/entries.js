import { axiosInstance } from './axios';

export const getEntries = async () => {
  try {
    const response = await axiosInstance.get('/entries');
    return response.data;
  } catch {
    console.log(error);
  }
};

export const getEntry = async (id) => {
  try {
    const response = await axiosInstance.get(`/entries/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createEntry = async (data) => {
  try {
    const response = await axiosInstance.post('/entries', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
