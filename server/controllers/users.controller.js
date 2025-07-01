import express from 'express';
import { createAxiosInstance } from '../axios.factory.js';

const router = express.Router();
const baseURL = process.env.USER_SERVICE_URL || 'http://localhost:4010';
const axios = createAxiosInstance({
  baseURL: baseURL,
  withCredentials: true,
});

export const getHealthStatus = async (req, res, next) => {
  try {
    const { data } = await axios.get('/health');
    res.status(200).json({ message: data.message });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { data } = await axios.post('/', req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || {
        error: 'Error connecting to user-service',
      }
    );
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const { data } = await axios.get(`/email/${req.params.email}`);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { data } = await axios.get(`/${req.params.id}`);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { data } = await axios.put(`/${req.params.id}`, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { data } = await axios.delete(`/${id}`, {
      headers: req.headers,
      withCredentials: true,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
