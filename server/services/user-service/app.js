import express from 'express';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.routes.js';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());
app.use(cookieParser());

// TODO: Add rate limiter and cors config

app.use('/', usersRouter);

app.get('/health', (_, res) => {
  res.status(200).json({ message: 'User service is running' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.status === 500 ? 'Internal server error' : err.message,
    error: err.message,
  });
});

export default app;
