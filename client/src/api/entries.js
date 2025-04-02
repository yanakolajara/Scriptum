import { axiosInstance } from './axios';

export const getEntries = async () => {
  try {
    const response = await axiosInstance.get('/entries');
    return response.data;
  } catch {
    console.log(error);
  }
};

export const createEntry = async () => {
  try {
    const response = await axiosInstance.post('/entries');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
