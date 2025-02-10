import { axiosInstance } from './axios.js';

export async function getAllUsers() {
  try {
    const users = await axiosInstance.get('/users');
    return users;
  } catch (error) {
    return error;
  }
}

export async function register(data) {
  try {
    const newUser = await axiosInstance.post('/users', data);
    return newUser;
  } catch (error) {
    return error;
  }
}

export async function login(email, password) {
  try {
    const user = await axiosInstance.get('/users/login', {
      email: email,
      password: password,
    });
    return user;
  } catch (error) {
    return error;
  }
}
