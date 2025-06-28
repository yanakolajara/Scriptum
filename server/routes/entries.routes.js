import express from 'express';
import { createAxiosInstance } from '../axios.factory.js';

const router = express.Router();
const baseURL = process.env.ENTRY_SERVICE_URL || 'http://localhost:4020';
const axios = createAxiosInstance({
  baseURL: baseURL,
  withCredentials: true,
});

router.get('/health', async (req, res) => {
  try {
    console.log(axios);
    const { data } = await axios.get('/health', {
      headers: req.headers,
      withCredentials: true,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const { data } = await axios.get(`/${req.params.id}`, {
//       headers: req.headers,
//       withCredentials: true,
//     });
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(error.response?.status || 500).json(
//       error.response?.data || {
//         error: 'Error connecting to user-service',
//       }
//     );
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { data } = await axios.post(
//       `${USER_SERVICE_URL}/users/login`,
//       req.body,
//       {
//         headers: req.headers,
//         withCredentials: true,
//       }
//     );
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(error.response?.status || 500).json(
//       error.response?.data || {
//         error: 'Error connecting to user-service',
//       }
//     );
//   }
// });

export default router;
