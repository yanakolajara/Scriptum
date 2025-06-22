import axios from '../api/axios.js';

export async function getUserContext({ userId }) {
  try {
    const response = await axios.get(`/user-context/${userId}`);
    const userContext = response.data.userContext || '';

    return userContext;
  } catch (error) {
    console.error('Error fetching user context:', error);
    // throw error;
    return '';
  }
}
