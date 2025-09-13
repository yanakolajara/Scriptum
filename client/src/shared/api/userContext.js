import axios from './axios';

export const updateUserContext = async (data) => {
  try {
    const response = await axios.put('/user-context', { data: data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
