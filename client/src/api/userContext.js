import { axiosInstance } from './axios';

export const updateUserContext = async (data) => {
  try {
    const response = await axiosInstance.put('/user-context', { data: data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
