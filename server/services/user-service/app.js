import express from 'express';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.routes.js';

const app = express();

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());
app.use(cookieParser());

// TODO: Add rate limiter and cors config

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the user service',
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.status === 500 ? 'Internal server error' : err.message,
    error: err.message,
  });
});

export default app;
