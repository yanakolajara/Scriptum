import axios from 'axios';

export const getUserByEmail = async (email) => {
  const { data } = await axios.get(
    `${process.env.USER_SERVICE_URL}/users/email/${email}`
  );
  return data.user;
};
