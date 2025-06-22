import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import entriesRouter from './routes/entries.routes.js';

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/user-context', entriesRouter);

app.use('/', (_, res) => res.status(200).json({ message: 'Hello world!' }));

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// todo: hide server error message (500)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.status === 500 ? 'Internal server error' : err.message,
    error: err.message,
  });
});

export default app;
