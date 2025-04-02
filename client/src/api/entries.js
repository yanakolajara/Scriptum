import { axiosInstance } from './axios';

export const getEntries = async () => {
  try {
    const response = await axiosInstance.get('/entries');
    return response.data;
  } catch {
    console.log(error);
  }
};
